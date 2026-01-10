import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { userLog } from "../constants.js";




const signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      roleType,

      // student fields
      batch,
      centerLocation,
      courseType,
      isOnline,

      // professional / instructor fields
      organisationName,
      currentRole,
    } = req.body;

    // ===== Basic required fields for ALL roles =====
    if (!firstName || !email || !phoneNumber || !password) {
      return res.status(400).json({
        success: false,
        message: "All basic fields are required",
      });
    }

    // ===== Check existing user =====
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // ===== Hash password =====
    const hashedPassword = await bcrypt.hash(password, 10);

    // ===== Create user object =====
    const user = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
      roleType,

      // pass all fields (mongoose will validate required ones)
      batch,
      centerLocation,
      courseType,
      isOnline,

      organisationName,
      currentRole,
    });

    // ===== Save (mongoose runs role-based validation here) =====
    await user.save();

    user.password = undefined;
    userLog(email);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });

  } catch (error) {
    console.error("Signup Error:", error);

    // ===== Friendly validation error message =====
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



const signIn = async (req, res) => {
    try {
        const { email, password } = req.body

        //Step 1 : Get emailid and password (Check if emailid and password got from client side)
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and Password are required" });
        }

        //Step 2 : Check if email id exists in database  if not throw error
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        //Step 3 : Verify password (using bcrypt verify password) (bcryp.compare(storedPassword,userEnteredPassword)) if password not same throw error
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }

        //Step 4 : Create a token using jwt (jwt.sign())

        /*
        jwt.sign(payload,Secret_token,expireDate)
        Sign the token: Use the sign method, passing the payload and a secret key. Many libraries support setting an expiration time with options like expiresIn.
Example: const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });.
Send the token: Return the generated token to the client. 
        */

        const token = jwt.sign({ id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.EXPIRE_TOKEN })

        
        const loginUser = await User.findOne({email}).select("-password")

        //Step 5 : res.cookies('token',token,{}), res.success sending cookies to client
        return res.cookie("accioConnect-token", token, { 

            /*
            // An HttpOnly false cookie is accessible to client-side JavaScript (document.cookie), unlike HttpOnly true cookies which are not. While false allows client interaction (useful for some frontend features), it makes the cookie vulnerable to Cross-Site Scripting (XSS) attacks, where malicious scripts can steal or manipulate it

            Xss client/browser cannot read access cookies
            */
            httpOnly: true,

            /*
            // Setting secure : false in cookies means the browser is allowed to transmit the cookie over unencrypted HTTP connections, which poses a significant security risk. This vulnerability can expose sensitive data to interception by attackers. 
            */
            secure: false,

            /*
                A "sameSite cookie" is a security feature that controls when a cookie is sent along with a cross-site request to prevent attacks like Cross-Site Request Forgery (CSRF)

                SameSite=Strict: The cookie is only sent when the browser is making a request to the exact same website that set the cookie.

                SameSite=Lax: The cookie is sent on all same-site requests. It's also sent on some cross-site requests that are top-level navigations using a safe method like GET, such as when a user clicks a link to your site.
                SameSite=None: The cookie is sent on both same-site and cross-site requests. This is necessary for resources like embedded iframes but requires the Secure attribute, meaning the cookie can only be sent over HTTPS. 
            */
            sameSite: "lax"
        }).status(200).json({ success: true, message: "Login successful", data: loginUser })


    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


export {
    signIn,
    signUp,
}