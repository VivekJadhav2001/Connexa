import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    requied: true,
  },
  firstName: {
    type: String,
    requied: true,
  },
  lastName: {
    type: String,
    requied: true,
  },
  password: {
    type: String,
    requied: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  roleType: {
    type: String,
    default: "admin",
  },
});

export const Admin = mongoose.model("Admin", adminSchema);
