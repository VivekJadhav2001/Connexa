import express from "express";
import { profile } from "../controllers/user.controller.js";
import { authorization } from "../middlewares/authorization.js";

const router = express.Router();

router.post("/profile", authorization, profile);

export default router;
