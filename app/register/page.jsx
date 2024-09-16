"use client";

import Link from "next/link";
import { useState, useContext } from "react";
import toast from "react-hot-toast";
import { Context } from "@/components/ClientComponents";
import { redirect } from "next/navigation";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return toast.error("Please fill all the fields");
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.success) {
        setUser(data.user);
        toast.success(data.message);
      } else {
        return toast.error(data.message);
      }

      console.log("data: ", data);
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
    <div className="flex flex-col items-center min-h-screen justify-center px-16 py-1">
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-6 items-center justify-center w-[30rem]"
      >
        <input
          type="text"
          placeholder="Username"
          className="border border-slate-300 text-slate-600 p-2 w-full rounded-sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="border border-slate-300 text-slate-600 p-2 w-full rounded-sm"
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

        <button className=" px-6 py-2 rounded-sm w-full mt-2">
          Register
        </button>
      </form>
      
      <div className="flex items-center gap-2 w-[30rem] mt-4 p-2">
        <p className="text-sm">Have an account? </p>
        <Link
          href="/login"
          className="text-sm text-blue-500 hover:underline underline-offset-4"
        >
          Log in
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
