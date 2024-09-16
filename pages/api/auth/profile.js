import { checkAuth } from "@/middlewares/auth";
import { errorHandler } from "@/middlewares/error";
import { User } from "@/models/user";
import { connectDb } from "@/utils/connetcDb";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return errorHandler(res, 400, "Only GET method is allowed");
  }

  try {
    await connectDb();

    const user = await checkAuth(req, res);

    res.status(200).json({
      user,
      success: true,
      message: "User fetched",
    });
  } catch (err) {
    return errorHandler(res);
  }
};
export default handler;
