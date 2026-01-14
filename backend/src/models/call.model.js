import mongoose from "mongoose";

const callSchema = new mongoose.Schema(
  {
    caller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    callType: {
      type: String,
      enum: ["video"],
      default: "video",
    },

    status: {
      type: String,
      enum: ["initiated", "ringing", "accepted", "ended", "missed", "rejected"],
      default: "initiated",
    },

    startedAt: Date,
    endedAt: Date,

    // isPaidCall: {
    //   type: Boolean,
    //   default: false
    // },
  },
  { timestamps: true }
);

export const Call = mongoose.model("Call", callSchema);

/*

Use Socket.IO for:

Online status

Call ringing

Accept / reject

Use WebRTC/ZegoCloude for actual video/audio

Schema only stores metadata, not streams
*/
