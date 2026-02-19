import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    fullname: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    course: {
      type: String,
      required: true,
      trim: true,
    },

    college: {
      type: String,
      trim: true,
    },

    message: {
      type: String,
      trim: true,
      maxlength: 500,
    },
  },
  { timestamps: true },
);

const Inquiry = mongoose.model("Inquiry", inquirySchema);

export default Inquiry;
