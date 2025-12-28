import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    contentType:{
        type:String, //img/video or blog
        required:true
    },
    content:{
        type:String,
        required:true
    },
    caption:{
        type:String
    },
    type:{
        type:String,  //referral-post or general-post
        required:true
    },
    isLikeDisabled:{
        type:Boolean
    },
    isCommentDisabled:{
        type:Boolean
    },
    likes:[
        {
            profilePic: {type : String, default:""},
            userName: {type : String, required:true},
            userId : {type: String, required:true}
        },
    ],
    comments:[
        {
            profilePic: {type : String},  //Add required, removed because of add comment
            userName: {type : String, required:true},
            userId : {type: String, required:true},
            comment : {type: String, required: true},
            createdAt:{type: Date, default: Date.now()}
        },
    ],
},{timestamps:true})

export const Post = mongoose.model("Post", postSchema) 