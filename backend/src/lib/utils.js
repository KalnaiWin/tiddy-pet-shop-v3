import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const genrateToken = (userId, res) => {
  // .sign( object , secretKey, option )
  const token = jwt.sign({ userId }, ENV.JWT_SECRET, {
    expiresIn: "7d", // seven days
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day
    httpOnly: true, // prevent XSS attacks: cross-site scripting
    sameSite: "strict", // prevent CSRF attacks
    secure: ENV.NODE_ENV === "development" ? false : true,
  });

  return token;
};
