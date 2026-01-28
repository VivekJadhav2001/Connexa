import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  login:{
    type:Date,
    default:Date.now
  },
  logout:{
    type:Date,
  },
  device:{
    type:String
  }
})

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },

    fullName: {
      type: String,
    },

    userName: {
      type: String,
    },

    email: { type: String, required: true, unique: true },
    phoneNumber: { type: Number, required: true, unique: true },
    password: { type: String, required: true },

    profilePicture: { type: String, required:true },

    roleType: {
      type: String,
      enum: ["student", "professional", "admin"],
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
    isOnline: {
      type: Boolean,
      default: false,
    },
    socialLinks: {
      github: {
        type: String,
      },
      X: {
        type: String,
      },
      personalWebsite: {
        type: String,
      },
    },
    skills: [String],
    resumeLink: {
      type: String,
    },

    // ===== Professional / Instructor fields =====
    organisationName: {
      type: String,
      required: function () {
        return this.roleType === "professional";
      },
    },

    isPlaced: { type: Boolean, default: false },
    jobRole: {
      type: String,
      required: function () {
        return this.roleType === "professional";
      },
    },
    jobLocation: {
      type: String,
      required: function () {
        return this.roleType === "professional";
      },
    },
    experienceYears: {
      type: Number,
      required: function () {
        return this.roleType === "professional";
      },
    },
    skills: [String],

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
    following:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    }],
    followers:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    }],

    // ===== Subscription =====
    subscription: {
      plan: {
        type: String,
        enum: ["free", "student_pro", "verified_pro"],
        default: "free",
      },
      expiresAt: Date,
      purchaseSource: String,
    },

    paidFeatures: {
      testimonialPostsUsed: { type: Number, default: 0 },
      jobApplicationsUsed: { type: Number, default: 0 },
      paidCallsUsed: { type: Number, default: 0 },
    },

    lastSeen: { type: Date },

    //Admin
    adminSecretKey: {
      type: String,
    },

    sessions:[sessionSchema]
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
