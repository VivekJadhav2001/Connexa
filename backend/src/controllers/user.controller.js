import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import crypto from "crypto";
import sendEmail from "../services/sendEmail.js";

const profile = async (req, res, next) => {
  try {
    //Step 1 : find user by id take it from authorize middleware
    // console.log(req, "Request"); // whatever you pass in next that will be the first argument in parameters(userDecoded,req,res,next)

    const Id = req.userDecoded.id;
    // console.log(Id, "Id from next")

    const user = await User.findById(Id, "-password");
    // console.log(user, "User Details")

    //step 2 : return user details but not password

    // followers = accepted requests where I am receiver
    // const followersCount = await Connection.countDocuments({
    //     receiver: Id,
    //     status: "accepted",
    // });

    // // following = accepted requests where I am requester
    // const followingCount = await Connection.countDocuments({
    //     requester: Id,
    //     status: "accepted",
    // });

    res.status(200).json({ success: true, message: "ok", data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email Is Required" });
    }

    const user = await User.findOne({ email });

    // Do NOT reveal if email exists so that the real user would get the mail and not the impersinator
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "If that email exists, a reset link has been sent",
      });
    }

    //Generate a Reset token

    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash token before saving to DB
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Save token + expiry on user
    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = Date.now() + 15 * 60 * 1000; // 15 minutes

    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    //Sending EMail
    await sendEmail({
      to: user.email,
      subject: "Password Reset",
      message: `Reset link: ${resetUrl}`,
    });

    res.status(200).json({ success: true, message: "Reset link sent" });
  } catch (error) {
    console.log(error, "Forgot Password Error");
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Token invalid/expired" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save({ validateBeforeSave: false });

    res.status(200).json({ success: true, message: "Password reset success" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err });
  }
};

// Update/Edit profile
const editProfile = async (req, res) => {
  try {
    /*
    Batch, profilePicture, phoneNumber,email,location, centerLocation, socialMedia Links, Skills, isPlaced, job location, experienceYears
    */

    const {
      batch,
      profilePicture,
      phoneNumber,
      email,
      location,
      centerLocation,
      github,
      X,
      personalWebsite,
      skills,
      isPlaced,
      jobLocation,
      experienceYears,
    } = req.body;

    const userId = req.userDecoded.id;

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found" });
    }

    //Based on role the required fields need to be send
    if (user.roleType === "student") {
      if (batch === "" || centerLocation === "") {
        return res.status(400).json({
          success: false,
          message: "Student profile fields cannot be empty",
        });
      }
    }

    if (user.roleType === "professional") {
      if (jobLocation === "" || experienceYears === "") {
        return res.status(400).json({
          success: false,
          message: "Professional profile fields cannot be empty",
        });
      }
    }

    const allowedFields = [
      "batch",
      "centerLocation",
      "profilePicture",
      "phoneNumber",
      "email",
      "location",
      "skills",
      "isPlaced",
      "jobLocation",
      "experienceYears",
    ];

    const updatedData = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updatedData[field] = req.body[field];
      }
    });

    if (github || X || personalWebsite) {
      updatedData.socialLinks = {
        github: github ?? user.socialLinks?.github,
        X: X ?? user.socialLinks?.X,
        personalWebsite: personalWebsite ?? user.socialLinks?.personalWebsite,
      };
    }

    const updatedUserData = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
      runValidators: true,
    }).select("-password");

    return res.status(200).json({
      success: true,
      message: "User Data Is Updated",
      data: updatedUserData,
    });
  } catch (error) {
    console.log(error, "Error in updating the Profile");
    res
      .status(500)
      .json({ success: false, message: "Internal Server error", error: error });
  }
};

/*

Apply for verification

Get verification status

Update subscription plan
*/

//forgotPassword is INCOMPLETE

export { profile, forgotPassword, resetPassword, editProfile };
