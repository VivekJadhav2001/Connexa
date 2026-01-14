import express from "express";
import { createAdmin } from "../controllers/create.controller.js";

const router = express.Router();

router.post("/admin", createAdmin);

export default router;
