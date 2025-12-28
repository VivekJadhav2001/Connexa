import mongoose from "mongoose";

const callSchema = new mongoose.Schema({
  caller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  callType: { type: String, enum: ["video", "audio"], default: "video" },
  status: {
    type: String,
    enum: ["initiated", "ringing", "accepted", "rejected", "ended"],
    default: "initiated"
  },

  startedAt: Date,
  endedAt: Date
}, { timestamps: true })

export const Call = mongoose.model("Call", callSchema)


/*

Use Socket.IO for:

Online status

Call ringing

Accept / reject

Use WebRTC for actual video/audio

Schema only stores metadata, not streams
*/