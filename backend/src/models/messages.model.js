import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  messageType: {
    type: String,
    enum: ["text", "image"],
    default: "text",
  },

  content: { type: String, required: true },

}, { timestamps: true });

export const Message = mongoose.model("Message", messageSchema);
