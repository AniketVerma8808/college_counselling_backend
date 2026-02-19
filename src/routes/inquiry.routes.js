import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import {
  createInquiryController,
  getUserInquiriesController,
  getAllInquiriesController,
} from "../controllers/inquiry.controller.js";

import { createInquiryValidation } from "../validations/inquiry.validation.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createInquiryValidation,
  validate,
  createInquiryController,
);

router.get("/my-inquiries", authMiddleware, getUserInquiriesController);

router.get("/admin", authMiddleware, getAllInquiriesController);

export default router;
