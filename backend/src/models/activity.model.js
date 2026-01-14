import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
    author : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    authorRole: {
      type: String,
      enum: ["student", "professional", "admin"],
      required: true
    },
    actionType:{
        type:String,
        enum:["login","logout","createPost","deletePost","likePost","commented","chatSend","videoCall","connect","profileUpdate","jobApply","deleteAccount"],
    },

    ipAddress: {
      type: String,
      required: true
    },
    location: {
      city: String,
      country: String
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true
    }
},{ versionKey: false }
)

export const Activity = mongoose.model("Activity",activitySchema)