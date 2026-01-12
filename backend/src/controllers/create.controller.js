import bcrypt from "bcryptjs"
import { Admin } from "../models/admin.model.js"


const createAdmin = async (req, res) => {
    try {
        const { email, password, adminSecretKey, firstName, lastName, phoneNumber } = req.body

        //Get all required Data
        if (!email || !password || !adminSecretKey || !phoneNumber || !firstName || !lastName) {
            return res.status(400).json({ success: false, message: "All Basic Fields Are Required" })
        }

        //Check if the user already exsists
        const exists = await Admin.findOne({ email })

        //if this guy exists
        if (exists) {
            return res.status(400).json({
                success: false,
                message: "Email Already Exists"
            })
        }

        //Hash The password
        const hashedPassword = await bcrypt.hash(password, 10)

        const admin = new Admin({
            firstName,
            lastName,
            email,
            phoneNumber,
            password: hashedPassword,
            roleType: "admin",
        });

        await admin.save()

        admin.password = undefined;

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: admin,
        });


    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Sever Error" })
    }
}

export {
    createAdmin
}