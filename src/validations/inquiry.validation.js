import { body } from "express-validator";

export const createInquiryValidation = [
  body("fullname").trim().notEmpty().withMessage("Fullname is required"),

  body("email").trim().isEmail().withMessage("Valid email is required"),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone is required")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone must be 10 digits"),

  body("course").trim().notEmpty().withMessage("Course is required"),

  body("college").optional().trim(),

  body("message")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Message cannot exceed 500 characters"),
];
