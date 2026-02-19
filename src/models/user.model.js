import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    mobile: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      default: "student",
    },

    refreshToken: String,

    resetPasswordToken: String,

    resetPasswordExpire: Date,
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
