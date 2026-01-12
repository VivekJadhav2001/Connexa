import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

async function adminAuthorization(req, res, next) {
    try {
        const token = req.cookies["accioConnect-token"]

        if (!token) {
            return res.status(401).json({ success: false, message: "No token provided" })
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Find user
        const user = await User.findById(decoded.id)

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        // Check admin role
        if (user.roleType !== "admin") {
            return res.status(403).json({ success: false, message: "Unauthorized - Admin only" })
        }

        // Attach user to request
        req.user = user

        next()
    } catch (error) {
        return res.status(403).json({ success: false, message: "Invalid or expired token" })
    }
}

export {
    adminAuthorization
}
