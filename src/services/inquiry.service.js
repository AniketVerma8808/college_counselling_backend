import Inquiry from "../models/inquiry.model.js";

export const createInquiryService = async (userId, data) => {
  return await Inquiry.create({
    user: userId,
    ...data,
  });
};

export const getUserInquiriesService = async (userId) => {
  return await Inquiry.find({ user: userId }).sort({ createdAt: -1 });
};

export const getAllInquiriesService = async () => {
  return await Inquiry.find()
    .populate("user", "fullname email")
    .sort({ createdAt: -1 });
};
