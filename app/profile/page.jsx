"use client";

import { useContext } from "react";
import { redirect } from "next/navigation";
import { Context } from "@/components/ClientComponents";

const ProfilePage = () => {
  const { user } = useContext(Context);

  if (!user._id) return redirect("/login");

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="shadow-md rounded-sm mt-[16em] px-14 py-8 flex flex-col gap-8 bg-cyan-50">
        <h1 className="text-2xl text-slate-700 border-b-2 border-teal-200 py-2">
          Your details
        </h1>
        <div className="flex flex-col gap-2 text-lg">
          <h2 className="">
            Username: <span className="text-slate-500">{user.name}</span>
          </h2>
          <h2>
            Email: <span className="text-slate-500">{user.email}</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
