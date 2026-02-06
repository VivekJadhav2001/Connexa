import express from "express";
import {
  deleteLogSessionByUserId,
  deleteUserById,
  getAllActiveUsers,
  getAllUserLogs,
  getAllUsers,
  getAllUserSession,
  getSessionByUserId,
  getUserById,
  getUsersSessionByIP,
} from "../controllers/admin.controller.js";
import { authorization } from "../middlewares/authorization.js";
import { adminAuthorization } from "../middlewares/adminAuthorization.js";

const router = express.Router();

router.get("/getAllUserLogs", adminAuthorization, getAllUserLogs);
router.get("/getAllUsers", adminAuthorization, getAllUsers);

router.get("/getUser/:userId", adminAuthorization, getUserById);

router.get("/getAllUserSessions",adminAuthorization,getAllUserSession)
router.get("/getUserSession/:userId",adminAuthorization,getSessionByUserId)
router.delete("/deleteUserSession",adminAuthorization,deleteLogSessionByUserId)
router.get("/getAllUsersByIP/:ip",adminAuthorization,getUsersSessionByIP)
router.get("/getAllActiveUsers",adminAuthorization,getAllActiveUsers)
router.delete("/deleteUser/:userId",adminAuthorization,deleteUserById)

export default router;
