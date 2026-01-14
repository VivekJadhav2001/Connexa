import mongoose from "mongoose";

const userSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sessionTime: {
      type: Number, //May be in seconds or minutes depends on frontend logic
      required: true,
    },
    source: {
      type: String, // logout | tab-close | crash,
      enum: ["logout", "tab-close", "crash", "lastLogin"],
      default: "logout",
    },
    deviceInfo: {
      type: String,
    },
  },
  { timestamps: true }
);

const UserSession = mongoose.model("UserSession", userSessionSchema);

export { UserSession };
