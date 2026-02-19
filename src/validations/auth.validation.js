import { body } from "express-validator";

export const registerValidation = [
  body("fullName")
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 3 }),

  body("email").isEmail().withMessage("Valid email required"),

  body("mobile")
    .isLength({ min: 10, max: 10 })
    .withMessage("Mobile must be 10 digits"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password minimum 6 characters"),
];

export const loginValidation = [
  body("email").isEmail(),
  body("password").notEmpty(),
];
