import fs from "fs"

const TYPE_OF_POST = {
    Referral_Post: "referral-post",
    General_Post: "general_post"
}


function userLog(userEmail) {
    const date = new Date()
    const content = `${userEmail} --- ${date.getTime()}`

    fs.writeFile(`./src/logs/users.txt`, content,(err,result)=>{
        if(!err){
            console.log(result)
        }
        console.log(err)
    })
}

export {
    TYPE_OF_POST,
    userLog
}