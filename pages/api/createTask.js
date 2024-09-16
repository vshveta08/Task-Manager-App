import { checkAuth } from "@/middlewares/auth";
import { errorHandler } from "@/middlewares/error";
import { Task } from "@/models/task";
import { connectDb } from "@/utils/connetcDb";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return errorHandler(res, 400, "Only POST method is allowed");
  }
  const { title, description } = req.body;

  if(!title || !description){
    return errorHandler(res, 400, "Please fill all the fields");
  }

  try {
    await connectDb();

    const user = await checkAuth(req, res);

    if(!user) {
      return errorHandler(res, 401, "Please login first");
    }

    const task = await Task.create({
      title: title,
      description: description,
      userId: user._id
    });

    res.json({
      task,
      success: true,
      message: "Task created successfully",
    });
    
  } catch (err) {
    return errorHandler(res);
  }
};

export default handler;
