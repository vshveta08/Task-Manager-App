"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

// making contextProvider and in layout file, wrapped children by this contextProvider. so that we can use this user value by using useContext anywhere in this app
export const Context = createContext({ user: {} });
export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  // if user is logged in then show it's profile of the user and show logout button after refreshing also
  useEffect(() => {
    fetch("/api/auth/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUser(data.user);
      });
  }, []);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
      <Toaster toastOptions={{style: {borderRadius: '2px'}}} />
    </Context.Provider>
  );
};

// when user is logged-in then show the logout button otherwise show login button
export const LogoutButton = () => {
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
    <>
      {user._id ? (
        <button
          className="hover:underline underline-offset-4 p-2 rounded-sm exclude"
          onClick={handleLogout}
        >
          Logout
        </button>
      ) : (
        <Link
          href="/login"
          className="hover:underline underline-offset-4 p-2 rounded-sm"
        >
          Login
        </Link>
      )}
    </>
  );
};

export const TaskButton = ({ title, id, completed }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/task/${id}`, { method: "DELETE" });
      const data = await res.json();
      console.log(data);
      if (!data.success) {
        return toast.error(data.message);
      }

      toast.success(data.message);
      setIsOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 700);
    } catch (err) {
      console.log(err);
      return toast.error(err);
    }
  };

  const handleComplete = async (id) => {
    try {
      const res = await fetch(`/api/task/${id}`, { method: "PUT" });
      const data = await res.json();
      console.log(data);
      if (!data.success) {
        return toast.error(data.message);
      }

      toast.success(data.message);
      setTimeout(() => {
        window.location.reload();
      }, 700);
    } catch (err) {
      console.log(err);
      return toast.error(err);
    }
  };

  return (
    <>
      <div className="flex gap-4">
        <input
          type="checkbox"
          checked={completed}
          className="w-[1.1rem] cursor-pointer exclude"
          onChange={() => handleComplete(id)}
        />
        <button
          onClick={() => setIsOpen(true)}
          className="text-red-600 py-1 text-2xl exclude"
        >
          <MdDelete />
        </button>
      </div>

      {isOpen && (
        <div className="min-h-screen backdrop-blur-sm w-full fixed inset-0 flex items-center justify-center">
          <div className="flex justify-center">
            <div className="flex flex-col bg-cyan-50 gap-12 px-[2.5em] py-[1.5em] rounded-sm shadow-md shadow-slate-400">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-cyan-800">
                  {" "}
                  {title}
                </h1>{" "}
                <RxCross2
                  onClick={() => setIsOpen(false)}
                  className="bg-teal-400 rounded-sm text-white text-3xl cursor-pointer hover:bg-teal-500  transition duration-500 ease-in-out"
                />
              </div>

              <p className="text-black">
                {" "}
                Are you sure want to delete this task?
              </p>
              <button
                onClick={() => handleDelete(id)}
                className="bg-red-500 text-xl py-[0.4em] px-1 text-white rounded-sm hover:bg-red-600 transition duration-500 ease-in-out exclude"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
