"use client";

import React, { useContext, useState } from "react";
import Link from "next/link";
import { Context, LogoutButton } from "@/components/ClientComponents";
import { Spin as Hamburger } from "hamburger-react";
import toast from "react-hot-toast";

export default function Header() {
  const [ham, setHam] = useState(false);
  const { user, setUser } = useContext(Context);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout");

      const data = await res.json();

      if (!data.success) toast.error(data.message);

      setUser({});

      toast.success(data.message);
      window.location.reload();
    } catch (err) {
      return toast.error(data.message);
    }
  };

  return (
    <div className="w-full fixed flex backdrop-blur-md items-center justify-between lg:px-24 md:px-24 sm:px-24 px-10 py-1 nav">
      <Link href="/" className="">
        <h1 className="text-xl text-black ">
          <span className="text-2xl font-bold text-teal-400 ">T</span>ask{" "}
          <span className="text-2xl font-bold text-teal-400">M</span>anager
        </h1>
      </Link>

      <div className="flex items-center ml-[5em] text-xl">
        <div className="block sm:hidden">
          {user._id && (
            <button
              className="cursor-pointer exclude"
              onClick={() => setHam((prev) => !prev)}
            >
              <Hamburger />
            </button>
          )}
          {ham && (
            <div className="absolute -ml-[4em] px-8 py-8 flex flex-col gap-5 text-xl shadow-md rounded-b-sm bg-teal-50">
              <>
                <Link
                  href="/profile"
                  className="hover:underline hover:text-teal-500 underline-offset-4 rounded-sm transition duration-300 ease-in-out"
                >
                  Profile
                </Link>
                <button
                  className="hover:underline hover:text-teal-500 underline-offset-4 rounded-sm exclude transition duration-300 ease-in-out"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-8 text-xl">
        {user._id ? (
          <div className="hidden sm:block">
            <div className="flex items-center gap-12">
              <Link
                href="/profile"
                className="hover:underline hover:text-teal-500 underline-offset-4 p-2 rounded-sm transition duration-300 ease-in-out"
              >
                Profile
              </Link>
              <button
                className="hover:underline hover:text-teal-500 underline-offset-4 p-2 rounded-sm exclude transition duration-300 ease-in-out"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-12">
            <div className="hidden sm:block">
              <Link
                href="/profile"
                className="hover:underline hover:text-teal-500 underline-offset-4 p-2 rounded-sm transition duration-300 ease-in-out"
              >
                Profile
              </Link>
            </div>

            <Link
              href="/login"
              className="hover:underline underline-offset-4 hover:text-teal-500 p-2 rounded-sm transition duration-300 ease-in-out"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
