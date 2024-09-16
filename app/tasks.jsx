"use client";

import { TaskItem } from "@/components/ServerComponents";
import { useEffect, useState } from "react";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch("/api/getTasks", { method: "GET" });
      const data = await res.json();
      console.log(data);
      setTasks(data.tasks);
      setLoading(false);
    };

    fetchTasks();
  }, []);


  if(loading){
    return (<div className="flex flex-col items-center justify-center mb-16 mt-10 pt-6 border-t border-slate-300 lg:w-[45rem] md:w-[35em] sm:w-[28em] w-[21em]">
      <h2 className="w-full text-sm text-slate-500">loading...</h2>
    </div>);
  }

  if(!tasks){
    return (<div className="flex flex-col items-center justify-center mb-16 mt-10 pt-6 border-t border-slate-300 lg:w-[45rem] md:w-[35em] sm:w-[28em] w-[21em]">
      <h2 className="w-full text-sm text-slate-500">There is no task! Add your task...</h2>
    </div>);
  }

  return (
    <>
      {tasks.length > 0 ? (
        <div className="flex flex-col items-center justify-center mb-16 mt-10 pt-6 border-t border-slate-300 lg:w-[45rem] md:w-[35em] sm:w-[28em] w-[21em]">
          {/* code to show already present Tasks or added tasks */}
          <h2 className="w-full text-xl font-semibold">Your Tasks</h2>

          {tasks?.map((task) => (
            <div key={task._id} className="flex justify-center w-full">
              <TaskItem
                title={task.title}
                description={task.description}
                id={task._id}
                completed={task.isCompleted}
              />
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default Tasks;
