"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LogoutButton } from "@/components/ClientComponents";
import { Spin as Hamburger } from "hamburger-react";

export default function Header() {
  const [ham, setHam] = useState(false);
  return (
    <div className="w-full fixed flex backdrop-blur-md items-center justify-between lg:px-24 md:px-24 sm:px-24 px-12 py-1 nav">
      <Link href="/">
        <h1 className="text-xl text-slate-600">
          <span className="text-2xl font-bold text-teal-400">T</span>ask{" "}
          <span className="text-2xl font-bold text-teal-400">M</span>anager
        </h1>
      </Link>

      <div className="block sm:hidden">
        <button
          className="cursor-pointer exclude"
          onClick={() => setHam((prev) => !prev)}
        >
          <Hamburger />
        </button>

        {ham && (
          <div className="absolute -ml-[4em] mt-[0.2em] px-8 py-6 flex flex-col gap-3 text-lg shadow-md rounded-b-sm bg-teal-50">
            <Link
              href="/profile"
              className="hover:underline underline-offset-4 p-2 rounded-sm"
            >
              Profile
            </Link>

            <LogoutButton />
          </div>
        )}
      </div>

      <div className="hidden sm:block">
        <div className="flex items-center gap-8 text-xl">
          <Link
            href="/profile"
            className="hover:underline underline-offset-4 p-2 rounded-sm"
          >
            Profile
          </Link>

          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
