import { errorHandler } from "@/middlewares/error";
import { cookieSetter } from "@/utils/cookieSetter";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return errorHandler(res, 400, "Only GET method is allowed");
  }

  try {
    // send token to null and set to false for deleting the token from cookie
    cookieSetter(res, null, false);

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (err) {
    return errorHandler(res);
  }
};

export default handler;
