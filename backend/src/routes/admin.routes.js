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

router.get("/getAllUserSessions",getAllUserSession)
router.get("/getUserSession/:userId",getSessionByUserId)
router.delete("/deleteUserSession",deleteLogSessionByUserId)
router.get("/getAllUsersByIP/:ip",getUsersSessionByIP)
router.get("/getAllActiveUsers",getAllActiveUsers)
router.delete("/deleteUser/:userId",deleteUserById)

export default router;
