"use client";

import { Context } from "@/components/ClientComponents";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

const TaskFrom = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  let router = useRouter();
  const { user } = useContext(Context);

  // if (!user._id) {
  //   redirect("/login");
  // }

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!user._id) {
      return toast.error("Please login first to add task");
    }

    if (!title || !description) {
      return toast.error("Please fill all the fields");
    }

    try {
      const res = await fetch("/api/createTask", {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        setTitle("");
        setDescription("");
        setTimeout(()=> {
          window.location.reload();
        }, 700);

      } else {
        return toast.error(data.message);
      }

      console.log("data: ", data);
    } catch (err) {
      console.log(err);
      return toast.error(data.message);
    }
  };

  return (
    <div className="flex items-center mt-12 justify-center lg:w-[45rem] md:w-[35em] sm:w-[28em] w-[21em]">
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-6 items-center justify-center mt-20 w-full "
      >
        <input
          type="text"
          placeholder="Title"
          className="border border-slate-300 text-slate-600 p-2 w-full rounded-sm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          className="border border-slate-300 text-slate-600 p-2 w-full rounded-sm"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="px-6 py-2 rounded-sm w-full mt-2">Add Task</button>
      </form>
    </div>
  );
};

export default TaskFrom;
