import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  postCategory: {
    type: String,
    enum: ["insight", "help", "referral"],
    required: true,
  },

  contentType: {
    type: String,
    enum: ["text", "image", "blog"],
    required: true,
  },

  content: { type: String, required: true },
  caption: { type: String },

  // Referral-specific fields
  referralDetails: {
    company: String,
    jobRole: String,
    applyLink: String,
    expiresAt: Date,
  },

  likesCount: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 },

  visibility: {
    type: String,
    enum: ["public", "connections"],
    default: "public",
  },

}, { timestamps: true });

export const Post = mongoose.model("Post", postSchema);
