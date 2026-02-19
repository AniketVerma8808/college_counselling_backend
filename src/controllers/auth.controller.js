import asyncHandler from "../middlewares/asyncHandler.js";

import * as authService from "../services/auth.service.js";

import sendEmail from "../utils/sendEmail.js";

import {
  accessCookieOptions,
  refreshCookieOptions,
} from "../utils/cookieOptions.js";

import { successResponse } from "../utils/apiResponse.js";

export const register = asyncHandler(async (req, res) => {
  const user = await authService.registerService(req.body);

  return successResponse(res, "Registered successfully", user);
});

export const login = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.loginService(
    req.body.email,
    req.body.password,
  );

  res.cookie("accessToken", accessToken, accessCookieOptions);

  res.cookie("refreshToken", refreshToken, refreshCookieOptions);

  return successResponse(res, "Login successful", user);
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const token = await authService.forgotPasswordService(req.body.email);

  const url = `${process.env.CLIENT_URL}/reset/${token}`;

  await sendEmail(req.body.email, "Reset Password", url);

  return successResponse(res, "Reset link sent to email");
});

export const resetPassword = asyncHandler(async (req, res) => {
  await authService.resetPasswordService(req.params.token, req.body.password);

  return successResponse(res, "Password reset successful");
});

export const logout = asyncHandler(async (req, res) => {
  await authService.logoutService(req.user._id);

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  return successResponse(res, "Logout successful");
});
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await authService.getAllUsersService();

  return successResponse(res, "Users fetched successfully", users);
});
