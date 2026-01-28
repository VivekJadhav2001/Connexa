import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import crypto from "crypto";

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
      return res
        .status(200)
        .json({
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
    user.passwordResetToken = hashedToken
    user.passwordResetExpires = Date.now() + 15 * 60 * 1000; // 15 minutes

    await user.save({ validateBeforeSave: false });


    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    //Sending EMail






  } catch (error) {
    console.log(error, "Forgot Password Error");
    return res
      .send(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const resetPassword = async (req,res)=>{

}

/*
Update/Edit profile

Apply for verification

Get verification status

Update subscription plan
*/

//forgotPassword is INCOMPLETE

export { profile };
