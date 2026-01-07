import express from "express"
import { getAllUserLogs } from "../controllers/admin.controller.js"
import { authorization } from "../middlewares/authorization.js"


const router = express.Router()


router.get("/getAllUserLogs",authorization,getAllUserLogs)

export default router