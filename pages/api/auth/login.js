import { errorHandler } from "@/middlewares/error";
import { User } from "@/models/user";
import { connectDb } from "@/utils/connetcDb";
import { cookieSetter } from "@/utils/cookieSetter";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return errorHandler(res, 400, "Only POST method is allowed");
  }

  const { email, password } = req.body;

  console.log("Email: ", email);
  console.log("Password: ", password);

  if (!email || !password) {
    return errorHandler(res, 400, "Please fill all the fields");
  }

  try {
    await connectDb();

    const user = await User.findOne({ email });
    // console.log("user: ", user);

    if (!user) {
      return errorHandler(res, 404, "Invalid Email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorHandler(res, 404, "Invalid Email or password");
    }

    // generate token and store it in cookie
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
    // console.log("token: ", token);
    cookieSetter(res, token, true);

    res.status(200).json({
      user,
      success: true,
      message: `Welcome back, ${user.name}`,
    });
  } catch (err) {
    return errorHandler(res);
  }
};

export default handler;
