import express from "express"
import {authorization} from "../middlewares/authorization.js"
import { appLoginHistory, appLogoutHistory } from "../controllers/logs.controller.js"

const router = express.Router()

router.get("/loginSession",authorization,appLoginHistory)
router.post("/logoutSession",authorization,appLogoutHistory)


export default router