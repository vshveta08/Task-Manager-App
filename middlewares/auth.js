import { User } from "@/models/user";
import { errorHandler } from "./error";
import jwt from "jsonwebtoken";

export const checkAuth = async(req, res) => {
  const cookie = req.headers.cookie;

  if (!cookie) return errorHandler(res, 401, "Please login first");

  //  split on the basis of = and take 1st index value
  const token = cookie.split("=")[1];

  // decode -> returns object -> {_id: "", iat: }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  //return user 
  return await User.findById(decoded._id);
};
