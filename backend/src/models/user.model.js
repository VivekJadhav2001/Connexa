import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },

  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true }, // string better
  password: { type: String, required: true },

  profilePicture: { type: String },

  roleType: {
    type: String,
    enum: ["student", "professional", "instructor", "admin"],
    default: "student",
  },

  // ===== Student-only fields =====
  batch: {
    type: String,
    required: function () {
      return this.roleType === "student";
    },
  },
  centerLocation: {
    type: String,
    required: function () {
      return this.roleType === "student";
    },
  },
  courseType: {
    type: String,
    required: function () {
      return this.roleType === "student";
    },
  },
  isOnline: { type: Boolean, default: false },

  // ===== Professional / Instructor fields =====
  organisationName: {
    type: String,
    required: function () {
      return this.roleType === "professional" || this.roleType === "instructor";
    },
  },
  currentRole: {
    type: String,
    required: function () {
      return this.roleType === "professional" || this.roleType === "instructor";
    },
  },

  isPlaced: { type: Boolean, default: false },

  // ===== Verification =====
  isVerified: { type: Boolean, default: false },
  verificationStatus: {
    type: String,
    enum: ["none", "pending", "approved", "rejected"],
    default: "none",
  },
  verificationDocs: [String],
  verifiedAt: Date,
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // admin
  },

  // ===== Subscription =====
  subscription: {
    plan: {
      type: String,
      enum: ["free", "student_pro", "verified_pro"],
      default: "free"
    },
    expiresAt: Date,
    purchaseSource: String
  },

  paidFeatures: {
    testimonialPostsUsed: { type: Number, default: 0 },
    jobApplicationsUsed: { type: Number, default: 0 },
    paidCallsUsed: { type: Number, default: 0 }
  },

  lastSeen: { type: Date },

}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
