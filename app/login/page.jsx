"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import { redirect } from "next/navigation";
import { Context } from "@/components/ClientComponents";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(Context);

  console.log(email);
  console.log(password);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Please fill all the fields");
    }

    let data = "";

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      data = await res.json();
      console.log(data);

      if (data.success) {
        setUser(data.user);
        toast.success(data.message);
      } else {
        return toast.error(data.message);
      }

      console.log("data: ", data);
      console.log("data.message: ", data.message);
      console.log("res: ", res.status);
    } catch (err) {
      console.log(err);
      return toast.error(data.message);
    }
  };

  // if user then redirect to home page route
  if (user._id) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col items-center min-h-screen px-16 py-1">
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-6 mt-40 items-center justify-center lg:w-[30rem] sm:w-[26em] w-[21em]"
      >
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 text-slate-600 p-2 w-full rounded-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-slate-300 text-slate-600 p-2 w-full rounded-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="px-6 py-2 rounded-sm w-full mt-2">Login</button>
      </form>

      <div className="flex items-center gap-2 lg:w-[30rem] sm:w-[26em] w-[21em] mt-4 p-2">
        <p className="text-sm">Don&apos;t have an account? </p>
        <Link
          href="/register"
          className="text-sm text-blue-500 hover:underline underline-offset-4"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
