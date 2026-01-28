import express from "express";
import { logout, signIn, signUp } from "../controllers/auth.controller.js";
import { authorization } from "../middlewares/authorization.js";

const router = express.Router();

router.post("/signUp", signUp);
router.post("/signIn", signIn);

router.post("/logout",authorization,logout)

export default router;
