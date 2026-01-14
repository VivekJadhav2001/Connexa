import express from "express";
import { getAllUserLogs } from "../controllers/admin.controller.js";
import { authorization } from "../middlewares/authorization.js";
import { adminAuthorization } from "../middlewares/adminAuthorization.js";

const router = express.Router();

router.get("/getAllUserLogs", adminAuthorization, getAllUserLogs);

export default router;
