import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const likeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    postCategory: {
      type: String,
      enum: ["poll", "referral", "general", "project"],
      required: true,
    },

    contentType: {
      type: String,
      enum: ["text", "image", "blog", "video", "carousel"],
      required: true,
    },

    content: { type: String, required: true },
    caption: { type: String },

    referralDetails: {
      company: String,
      jobRole: String,
      applyLink: String,
      expiresAt: Date,
    },

    // Embedded likes (only user reference)

    likes: [likeSchema],

    // Embedded comments
    comments: [commentSchema],

    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },

    visibility: {
      type: String,
      enum: ["public", "connections"],
      default: "public",
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
