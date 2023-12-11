import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
      unique: true,
    },
    userPassword: {
      type: String,
      required: true,
    },
    userMobileNumber: {
      type: Number,
    },
    userIsVerified: {
      type: Boolean,
      default: false,
    },
    userEmailToken: {
      type: String,
      createdAt: { 
        type: Date, 
        default: Date.now(), 
        expires: 3600 },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
