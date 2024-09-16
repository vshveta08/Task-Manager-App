import { checkAuth } from "@/middlewares/auth";
import { errorHandler } from "@/middlewares/error";
import { Task } from "@/models/task";
import { connectDb } from "@/utils/connetcDb";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return errorHandler(res, 400, "Only GET method is allowed");
  }

  try {
    await connectDb();

    const user = await checkAuth(req, res); 
    
    if (!user) {
      return errorHandler(res, 401, "Please login first");
    }
  
    const tasks = await Task.find({userId: user._id}).sort({createdAt: -1});
    console.log("tasks: ", tasks);

    if (!tasks) {
      res.status(200).json({
        tasks,
        success: true,
        message: "There is no task",
      });
    }

    res.status(200).json({
      tasks,
      success: true,
      message: "Fetched all tasks successfully",
    });
  } catch (err) {
    return errorHandler(res);
  }
};

export default handler;
