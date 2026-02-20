export const accessCookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: "strict",
  maxAge: 60 * 60 * 1000,
};

export const refreshCookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: "strict",
  maxAge: 15 * 24 * 60 * 60 * 1000,
};
