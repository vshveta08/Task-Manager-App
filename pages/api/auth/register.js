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
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return errorHandler(res, 400, "Please fill all the fields");

  try {
    await connectDb();

    let user = await User.findOne({ email });

    if (user) {
      return errorHandler(res, 400, "User already exists with this email");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // generate token and store it in cookie
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
    console.log("token: ", token);

    cookieSetter(res, token, true); // set-true for logging in. set-false for logout

    res.json({
      user,
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    return errorHandler(res);
  }
};

export default handler;
