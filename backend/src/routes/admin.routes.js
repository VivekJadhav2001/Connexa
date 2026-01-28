import express from "express";
import { getAllUserLogs, getAllUsers, getUserById } from "../controllers/admin.controller.js";
import { authorization } from "../middlewares/authorization.js";
import { adminAuthorization } from "../middlewares/adminAuthorization.js";

const router = express.Router();

router.get("/getAllUserLogs", adminAuthorization, getAllUserLogs);
router.get("/getAllUsers",adminAuthorization,getAllUsers)

router.get("/getUser/:userId",adminAuthorization,getUserById)

export default router;
