import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { userLog } from "../constants.js";
import { Admin } from "../models/admin.model.js";
import crypto from "crypto";
import sendEmail from "../services/sendEmail.js";

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
      { expiresIn: process.env.EXPIRE_TOKEN },
    );

    //Create Sessions
    user.lastLogin = Date.now();
    const session = {
      login: Date.now(),
      device: req.headers["user-agent"] || "Unknown Device",
    };

    user.sessions.push(session);
    user.isOnline = true;
    await user.save();

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

//Logout

const logout = async (req, res) => {
  try {
    const userId = req.userDecoded?.id;

    if (userId) {
      const user = await User.findById(userId);

      if (user && user.sessions.length > 0) {
        const lastSession = user.sessions[user.sessions.length - 1];

        if (lastSession && !lastSession.logout) {
          lastSession.logout = new Date();
        }
      }

      user.isOnline = false;
      user.lastLogout = new Date();

      await user.save();
    }

    res.clearCookie("accioConnect-token", {
      httpOnly: true,
      secure: false, // MUST match how you set it
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const requestAdminSecret = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const admin = await Admin.findOne({ email });
    console.log(admin, "ADMIN");
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    }

    //CREARE A 6 DIGIT CODE
    const secret = crypto.randomInt(100000, 999999).toString();

    admin.adminSecret = crypto
      .createHash("sha256")
      .update(secret)
      .digest("hex");

    //Expire this CODE AFTER 10MIN
    admin.adminSecretExpire = Date.now() + 10 * 60 * 1000;
    await admin.save();

    await sendEmail({
      to: admin.email,
      subject: "Connexa Admin Login Secret",
      message: `Your admin secret is: ${secret}\nValid for 10 minutes.`,
    });

    return res.status(200).json({
      success: true,
      message: "Admin secret sent to email",
    });
  } catch (error) {
    console.error("Admin Secret Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, adminSecret } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    const hashedSecret = crypto
      .createHash("sha256")
      .update(adminSecret)
      .digest("hex");

    if (
      admin.adminSecret !== hashedSecret ||
      admin.adminSecretExpire < Date.now()
    ) {
      return res.status(403).json({
        success: false,
        message: "Invalid or expired admin secret",
      });
    }

    // clear secret
    admin.adminSecret = undefined;
    admin.adminSecretExpire = undefined;
    await admin.save();

    const token = jwt.sign(
      { id: admin._id, role: admin.roleType },
      process.env.JWT_SECRET,
      { expiresIn: process.env.EXPIRE_TOKEN },
    );

    const adminData = await Admin.findById(admin._id).select("-password");

    return res
      .cookie("connexa-admin-token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      })
      .status(200)
      .json({
        success: true,
        message: "Admin login successful",
        data: adminData,
      });
  } catch (error) {
    console.error("Admin Login Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { signIn, signUp, logout, loginAdmin, requestAdminSecret };
