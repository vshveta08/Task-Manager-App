import { Suspense } from "react";
import TaskForm from "./taskForm";
import Tasks from "./tasks";

const Home = async () => {
  return (
    <div className="flex flex-col items-center w-full">
      <TaskForm />

      {/* code to show already present Tasks or added tasks */}
      <Tasks />
    </div>
  );
};

export default Home;
