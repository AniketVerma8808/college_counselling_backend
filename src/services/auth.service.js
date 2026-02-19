import User from "../models/user.model.js";
import crypto from "crypto";

import { hashPassword, comparePassword } from "../utils/hash.js";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";

export const registerService = async (data) => {
  const exists = await User.findOne({ email: data.email });

  if (exists) throw new Error("User already exists");

  data.password = await hashPassword(data.password);

  return await User.create(data);
};

export const loginService = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) throw new Error("Invalid credentials");

  const match = await comparePassword(password, user.password);

  if (!match) throw new Error("Invalid credentials");

  const accessToken = generateAccessToken(user);

  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;

  await user.save();

  return {
    user,
    accessToken,
    refreshToken,
  };
};

export const forgotPasswordService = async (email) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("User not found");

  const resetToken = crypto.randomBytes(32).toString("hex");

  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  await user.save();

  return resetToken;
};

export const resetPasswordService = async (token, password) => {
  const hashed = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashed,

    resetPasswordExpire: {
      $gt: Date.now(),
    },
  });

  if (!user) throw new Error("Token invalid");

  user.password = await hashPassword(password);

  user.resetPasswordToken = undefined;

  user.resetPasswordExpire = undefined;

  await user.save();
};

export const logoutService = async (userId) => {
  const user = await User.findById(userId);

  if (!user) throw new Error("User not found");

  user.refreshToken = null; // DB se refresh token remove
  await user.save();
};
export const getAllUsersService = async () => {
  return await User.find().select("-password -refreshToken");
};
