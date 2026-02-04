import express from "express";
import { editProfile, forgotPassword, profile, resetPassword } from "../controllers/user.controller.js";
import { authorization } from "../middlewares/authorization.js";
import { acceptConnectionRequest, getConnectionStatus, rejectConnectionRequest, sendConnectionRequest } from "../controllers/connection.controller.js";

const router = express.Router();

router.post("/profile", authorization, profile);

router.post("/connect/:userId", authorization, sendConnectionRequest);
router.post("/connect/accept/:requestId", authorization, acceptConnectionRequest);
router.post("/connect/reject/:requestId", authorization, rejectConnectionRequest);
router.get("/connect/status/:userId", authorization, getConnectionStatus);

router.post("/forgot-password",forgotPassword)
router.post("/reset-password/:token", resetPassword);
router.patch("/editProfile",authorization,editProfile)

export default router;
