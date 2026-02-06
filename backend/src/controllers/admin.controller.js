import fs from "fs/promises";
import { User } from "../models/user.model.js";
import { UserSession } from "../models/userSession.model.js";
import mongoose from "mongoose";

const getAllUserLogs = async (req, res) => {
  console.log(req, "Request in admin controller");
  try {
    const userLogsData = await fs.readFile("./src/logs/users.txt", "utf-8");

    res.status(200).json({
      success: true,
      message: "Fetched all user logs",
      data: userLogsData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({}).select("-password");

    if (!allUsers.length) {
      return res
        .status(404)
        .json({ success: false, message: "No Users Avaliable For Now" });
    }

    return res
      .status(200)
      .json({ success: true, message: "All Users", data: allUsers });
  } catch (error) {
    console.log(error, "Admin Fetch All users api");
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getUserById = async (req, res) => {
  try {
    // User id that admin wants to search
    const userId = req.params.userId;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID Is Required" });
    }

    const userData = await User.findById(userId).select("-password");

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "User Data", data: userData });
  } catch (error) {
    console.log(error, "Get All User By Id Error");
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getAllUserSession = async (req, res) => {
  try {
    const allUserSession = await UserSession.find({});

    return res.status(200).json({
      success: true,
      message: "All User's Sessions Fetched",
      data: allUserSession,
    });
  } catch (error) {
    console.log(error, "Error In Getting All User Sessions");
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getSessionByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User Id Is Missing" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    const userSession = await UserSession.find({ userId });

    if (!userSession) {
      return res
        .status(404)
        .json({ success: false, message: "User Session Not Found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "User Session Data", data: userSession });
  } catch (error) {
    console.log(error, "Error In Getting User Sessions");
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const deleteLogSessionByUserId = async (req, res) => {
  try {
    const { userId, sessionId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User Id Is Missing" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    const userSession = await UserSession.findByIdAndDelete(sessionId);

    return res.status(410).json({
      success: true,
      message: "Deleted User Session Successfully",
      data: userSession,
    });
  } catch (error) {
    console.log(error, "Error In Deleting User Session");
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getUsersSessionByIP = async (req, res) => {
  try {
    const ip = req.params.ip;

    if (!ip) {
      return res
        .status(400)
        .json({ success: false, message: "IP Address Is Missing" });
    }

    const usersFromSameIPAddress = UserSession.find({ ip });

    if (!usersFromSameIPAddress) {
      return res
        .status(404)
        .json({ success: false, message: "No User Found By This IP Address" });
    }

    console.log(usersFromSameIPAddress, "Users from same ip");

    return res.status(200).json({
      success: true,
      message: "Fetched All Users From IP Address",
      data: usersFromSameIPAddress,
    });
  } catch (error) {
    console.log(error, "Error In Getting User Session By IP");
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

//Active Users
const getAllActiveUsers = async (req, res) => {
  try {
    const users = await User.find(
      { isOnline: true },
      {
        password: 0,
        adminSecretKey: 0,
        passwordResetToken: 0,
        passwordResetExpires: 0,
      },
    )
    res.status(200).json({
      success: true,
      count: users.length,
      message:"All Active Users",
      data:users
    });
  } catch (error) {
    console.log(error, "Error In Getting All Active Users");
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const deleteUserById = async (req,res)=>{
  try {
    const userId = req.params.userId 

    if(!userId){
      return res.status(400).json({success:false,message:"User Id Is Required"})
    }

    //THIS IS TO CHECK if it IS  A MONGOOSE ID
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid User Id"
      });
    }

    const deletedUser = await User.findByIdAndDelete(userId)

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User Not Found"
      });
    }

    return res.status(200).json({success:true,message:"User Deleted Successfully",data:deletedUser})
  } catch (error) {
    console.log(error, "Error In Deleting User");
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export {
  getAllUserLogs,
  getAllUsers,
  getUserById,
  getAllUserSession,
  getSessionByUserId,
  deleteLogSessionByUserId,
  getUsersSessionByIP,
  getAllActiveUsers,
  deleteUserById
};

/*
Day 0 : Build Basic Frontend for Posts and its CRUD ops, Profile Edits , make a pinned Post for admin, and also create another user profile for me(user) for sending connection requests, Make dummy data of 50 Students and build UI of admin dashboards and main app

Day 1 : Store Images in Local Disk of machine using Streams (Includeing multiple imgs for posts ) X AWS S3 integration for storing images (posts and profile pics) 

Day 2 : Countinue Day 1 (frontend and backend flow)

Day 3 : Sign In Check (only Accio students should be able to login sign up, check from dummy data)

Day 4 : Admin Authorization and Authentication ()

Day 5 : Student Dashboard for admin with filter (batch, location, ), search box , pie charts to view performance of student


Day 6 : Admin Actions Deactivation ops (Student account deactivate, post like, comments disabling, )

Day 7 : Admin can have a option of pinning his post on the feed while creating the post




Note: 1) For now focus on student and admin pannel, student can post any kind of posts, can send connect requests to users
2) Admin dashboard should be good with pop-ups, toasts, pie charts

3) implement most optimal methods in frontend




*/
