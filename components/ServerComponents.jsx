import { TaskButton } from "./ClientComponents";

export const TaskItem = ({ title, description, id, completed }) => {
  return (
    <div className="flex items-center justify-center w-full ">
      <div className="flex w-full bg-cyan-50 gap-4 items-center justify-between shadow-md mt-6 px-4 py-2 rounded-sm">
        <div className="break-words w-full">
          <p className="font-semibold text-slate-700">{title}</p>
          <p className="text-sm line-clamp-1 mt-2 text-slate-600 transition duration-1000 hover:ease-in-out hover:line-clamp-none ">{description}</p>
        </div>

        {/* client component- delete and checkbox buttons */}
          <TaskButton title={title} id={id} completed={completed} />
      </div>
    </div>
  );
};
  