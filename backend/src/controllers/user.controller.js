import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

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

/*
Update profile

Apply for verification

Get verification status

Update subscription plan
*/

export { profile };
