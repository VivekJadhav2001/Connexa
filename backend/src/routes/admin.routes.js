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
import { adminAuthorization } from "../middlewares/adminAuthorization.js";
import { deletePost, getAllPosts } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/getAllUserLogs", adminAuthorization, getAllUserLogs);
router.get("/getAllUsers", adminAuthorization, getAllUsers);

router.get("/getUser/:userId", adminAuthorization, getUserById);

router.get("/getAllUserSessions", adminAuthorization, getAllUserSession);
router.get("/getUserSession/:userId", adminAuthorization, getSessionByUserId);
router.delete(
  "/deleteUserSession",
  adminAuthorization,
  deleteLogSessionByUserId,
);
router.get("/getAllUsersByIP/:ip", adminAuthorization, getUsersSessionByIP);
router.get("/getAllActiveUsers", adminAuthorization, getAllActiveUsers);
router.delete("/deleteUser/:userId", adminAuthorization, deleteUserById);
router.get("/getAllPosts", adminAuthorization, getAllPosts);
router.delete("/deletePost/:postId", adminAuthorization, deletePost);

router.get("/check", adminAuthorization, (req, res) => {
  res.status(200).json({
    success: true,
    admin: req.admin,
  });
});

export default router;
