import { checkAuth } from "@/middlewares/auth";
import { errorHandler } from "@/middlewares/error";
import { Task } from "@/models/task";

const handler = async (req, res) => {
  const user = await checkAuth(req);

  const taskId = req.query.id;
  //   console.log("taskId: ", taskId);

  const task = await Task.findById(taskId);
  //   console.log("task: ", task);

  if (!task) {
    return errorHandler(res, 404, "Task not found");
  }

  if (req.method === "PUT") {
    try {
      task.isCompleted = !task.isCompleted;

      await task.save();

      res.status(200).json({
        success: true,
        message: "Task Updated Successfully",
      });
    } catch (err) {
      res.status(500).json({
        err,
        success: false,
        message: "Internal server error",
      });
    }
  } else if (req.method === "DELETE") {
    try {
     
      await task.deleteOne();

      res.status(200).json({
        success: true,
        message: "Task Deleted Successfully",
      });

    } catch (err) {
      res.status(500).json({
        err,
        success: false,
        message: "Internal server error",
      });
    }
  } else {
    return errorHandler(res, 400, "This method is not available");
  }
};

export default handler;
