import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },

  email: { type: String, required: true, unique: true },
  phoneNumber: { type: Number, required: true, unique: true },
  password: { type: String, required: true },

  profilePicture: { type: String },

  // Institute-specific (good differentiator)
  batch: { type: String, required: true },
  centerLocation: { type: String, required: true },
  courseType: { type: String, required: true },
  isOnline: { type: Boolean, default: false },

  // Professional info
  roleType: {
    type: String,
    enum: ["student", "professional", "instructor"],
    default: "student",
  },

  isPlaced: { type: Boolean, default: false },
  organisationName: { type: String },
  currentRole: { type: String },

  // Verification
  isVerified: { type: Boolean, default: false },
  verificationStatus: {
    type: String,
    enum: ["none", "pending", "approved", "rejected"],
    default: "none",
  },

  // Subscription
  subscriptionPlan: {
    type: String,
    enum: ["free", "pro"],
    default: "free",
  },

  lastSeen: { type: Date },

}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
