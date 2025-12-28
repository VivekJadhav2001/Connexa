import jwt from "jsonwebtoken"

function authorization(req,res,next){
    //Step 1 : Get cookie from client
    const token = req.cookies["accioConnect-token"]
    console.log(token,"GETTING COOKIE FROM CLIENT")

    if(!token){
       return res.status(401).json({success:false,message:"No token Passed"})
    }

    //Step 2 : Verify token from jwt
    //jwt.verify(token,secretKey)
    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    console.log(decoded,"Decoded from jwt")

    if(!decoded){
        res.status(403).json({success:false,message:"Token not valid"})
    }


    
    //Step 3 : move next // not a good practice
    // next(decoded)

    //Other way instead of next BETTER WAY TO SEND THIS
    req.userDecoded = decoded


    next()
}


export {
    authorization
}