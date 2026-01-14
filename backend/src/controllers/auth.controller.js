import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { userLog } from "../constants.js";
import { Admin } from "../models/admin.model.js";

const signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      roleType,

      // student fields
      batch,
      centerLocation,
      courseType,
      isOnline,

      // professional / instructor fields
      organisationName,
      currentRole,
    } = req.body;

    // ===== Basic required fields for ALL roles =====
    if (!firstName || !email || !phoneNumber || !password) {
      return res.status(400).json({
        success: false,
        message: "All basic fields are required",
      });
    }

    // ===== Check existing user =====
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // ===== Hash password =====
    const hashedPassword = await bcrypt.hash(password, 10);

    // ===== Create user object =====
    const user = new User({
      firstName,
      lastName,
      userName: firstName + lastName,
      fullName: firstName + " " + lastName,
      email,
      phoneNumber,
      password: hashedPassword,
      roleType,
      // pass all fields (mongoose will validate required ones)
      batch,
      centerLocation,
      courseType,
      isOnline,

      organisationName,
      currentRole,
    });

    // ===== Save (mongoose runs role-based validation here) =====
    await user.save();

    user.password = undefined;
    userLog(email);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.error("Signup Error:", error);

    // ===== Friendly validation error message =====
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    // 2. Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 3. Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // 5. Generate JWT with role
    const token = jwt.sign(
      {
        id: user._id,
        role: user.roleType,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.EXPIRE_TOKEN }
    );

    // 6. Remove password before sending user data
    const loginUser = await User.findById(user._id).select("-password");

    // 7. Send cookie + response
    return res
      .cookie("accioConnect-token", token, {
        httpOnly: true,
        secure: false, // true in production with HTTPS
        sameSite: "lax",
      })
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        data: loginUser,
      });
  } catch (error) {
    console.error("SignIn Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password, adminSecretKey } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    //compare Password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // Extra check only for admins
    if (admin.roleType === "admin") {
      if (!adminSecretKey) {
        return res.status(403).json({
          success: false,
          message: "Admin secret required",
        });
      }

      if (adminSecretKey !== process.env.ADMIN_SECRET) {
        return res.status(403).json({
          success: false,
          message: "Invalid admin secret",
        });
      }
    }

    const token = jwt.sign(
      {
        id: admin._id,
        role: admin.roleType,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.EXPIRE_TOKEN }
    );

    // 6. Remove password before sending user data
    const loginAdmin = await Admin.findById(admin._id).select("-password");

    // 7. Send cookie + response
    return res
      .cookie("accioConnect-token", token, {
        httpOnly: true,
        secure: false, // true in production with HTTPS
        sameSite: "lax",
      })
      .status(200)
      .json({
        success: true,
        message: "Admin Login successful",
        data: loginAdmin,
      });
  } catch (error) {
    console.error("SignIn Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export { signIn, signUp, loginAdmin };
