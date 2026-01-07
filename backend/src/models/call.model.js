import mongoose from "mongoose";

const callSchema = new mongoose.Schema({
  caller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  callType: { type: String, enum: ["audio", "video"] },

  status: {
    type: String,
    enum: ["initiated", "ringing", "accepted", "ended"],
    default: "initiated",
  },

  startedAt: Date,
  endedAt: Date,

  isPaidCall: { type: Boolean, default: false },

}, { timestamps: true });

export const Call = mongoose.model("Call", callSchema);


/*

Use Socket.IO for:

Online status

Call ringing

Accept / reject

Use WebRTC for actual video/audio

Schema only stores metadata, not streams
*/