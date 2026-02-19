import express from "express";

import {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getAllUsers,
} from "../controllers/auth.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import {
  registerValidation,
  loginValidation,
} from "../validations/auth.validation.js";

const router = express.Router();

/*
REGISTER ROUTE
*/
router.post("/register", registerValidation, validate, register);

/*
LOGIN ROUTE
*/
router.post("/login", loginValidation, validate, login);

/*
FORGOT PASSWORD
*/
router.post("/forgot-password", forgotPassword);

/*
RESET PASSWORD
*/
router.post("/reset-password/:token", resetPassword);

/*
LOGOUT (Protected)
*/
router.post("/logout", authMiddleware, logout);

/*
GET ALL USERS (Admin Only)
*/
router.get("/users", authMiddleware, roleMiddleware("admin"), getAllUsers);

export default router;
