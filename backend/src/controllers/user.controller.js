import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import crypto from "crypto";
import sendEmail from "../services/sendEmail.js";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { client } from "../services/S3_Buckets.js";

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

//Upload Profile Picture to S3
const getProfilePicUploadUrl = async (req, res) => {
  try {
    const { fileName, fileType } = req.body;
    const userId = req.userDecoded.id;

    console.log(req.body, "PROFILE PIC BODY");

    if (!fileName || !fileType) {
      return res
        .status(400)
        .json({ success: false, message: "FileName And FileType Is Required" });
    }

    if (!fileType.startsWith("image/")) {
      return res.status(400).json({
        success: false,
        message: "Only Image Files Allowed",
      });
    }

    const key = `profile-pictures/${userId}-${Date.now()}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      ContentType: fileType,
      ContentDisposition: "inline",
    });

    const uploadUrl = await getSignedUrl(client, command, {
      expiresIn: 120,
    });

    const publicUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    return res.status(200).json({
      success: true,
      uploadUrl,
      publicUrl,
    });
  } catch (error) {
    console.log(error, "Error in updating the Profile");
    return res
      .status(500)
      .json({ success: false, message: "Internal Server error", error: error });
  }
};

//Upload that profile picture image Url to Database
const updateProfilePicture = async (req, res) => {
  try {
    const { profilePicture } = req.body;
    const userId = req.userDecoded.id;

    if (!userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized To Perform This Action",
      });
    }

    if (!profilePicture) {
      return res.status(400).json({
        success: false,
        message: "profilePicture URL required",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { profilePicture },
      { new: true },
    ).select("firstName lastName profilePicture");

    res.status(200).json({
      success: true,
      message: "Profile picture updated",
      data: user,
    });
  } catch (err) {
    console.error("Profile pic update error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//Remove Profile Picture From DB
const removeProfilePicture = async (req, res) => {
  try {
    const userId = req.userDecoded.id;
    const user = await User.findById(userId);

    if (!user || !user.profilePicture) {
      return res
        .status(404)
        .json({ success: false, message: "No profile picture found" });
    }

    const key = new URL(user.profilePicture).pathname.slice(1);

    await client.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
      }),
    );

    user.profilePicture = "";
    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile picture removed successfully",
    });
  } catch (err) {
    console.error("Profile pic Removal error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const suggestedUsers = async (req, res) => {
  try {
    const userId = req.userDecoded.id;

    const user = await User.findById(userId);

    const suggestedUsersList = await User.find(
      {
        _id: {
          $nin: [...user.following, user._id],
        },
      },
      {
        firstName: 1,
        lastName: 1,
        fullName: 1,
        userName: 1,
        email: 1,
        batch: 1,
        centerLocation: 1,
      },
    );

    return res
      .status(200)
      .json({
        success: false,
        message: "Suggested Users Fetched",
        data: suggestedUsersList,
      });
  } catch (error) {
    console.error("Error In Suggested Users:", error);
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
};

/*

Apply for verification

Get verification status

Update subscription plan
*/

export {
  profile,
  forgotPassword,
  resetPassword,
  editProfile,
  getProfilePicUploadUrl,
  updateProfilePicture,
  removeProfilePicture,
  suggestedUsers,
};
