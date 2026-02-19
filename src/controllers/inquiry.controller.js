import asyncHandler from "../middlewares/asyncHandler.js";
import {
  createInquiryService,
  getUserInquiriesService,
  getAllInquiriesService,
} from "../services/inquiry.service.js";

export const createInquiryController = asyncHandler(async (req, res) => {
  const inquiry = await createInquiryService(req.user.id, req.body);

  res.status(201).json({
    success: true,
    message: "Inquiry submitted successfully",
    data: inquiry,
  });
});

export const getUserInquiriesController = asyncHandler(async (req, res) => {
  const inquiries = await getUserInquiriesService(req.user.id);

  res.status(200).json({
    success: true,
    data: inquiries,
  });
});

export const getAllInquiriesController = asyncHandler(async (req, res) => {
  const inquiries = await getAllInquiriesService();

  res.status(200).json({
    success: true,
    data: inquiries,
  });
});
