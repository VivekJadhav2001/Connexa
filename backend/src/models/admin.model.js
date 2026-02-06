import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  roleType: {
    type: String,
    default: "admin",
  },
  adminSecret: String,
  adminSecretExpire: Date,
});

export const Admin = mongoose.model("Admin", adminSchema);
