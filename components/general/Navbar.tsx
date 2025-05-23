"use client";
import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export function Navbar() {
  const { getUser } = useKindeBrowserClient();
  const user = getUser();

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md px-6 py-4 flex justify-between items-center rounded-b-xl">
      {/* Left Section */}
      <div className="flex items-center gap-8">
        <Link href="/">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800">
            Dev<span className="text-indigo-600">Diary</span>
          </h1>
        </Link>
        <div className="hidden sm:flex items-center gap-6">
          <Link
            className="text-sm font-medium text-slate-700 hover:text-indigo-500 transition-colors"
            href="/"
          >
            Home
          </Link>
          <Link
            className="text-sm font-medium text-slate-700 hover:text-indigo-500 transition-colors"
            href="/dashboard"
          >
            Dashboard
          </Link>
        </div>
      </div>

      {/* Right Section */}
      {user ? (
        <div className="flex items-center gap-4">
          <p className="text-sm font-medium">Hi, {user.given_name}</p>
          <LogoutLink className={buttonVariants({ variant: "destructive" })}>
            Log out
          </LogoutLink>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <LoginLink className={buttonVariants()}>Login</LoginLink>
          <RegisterLink className={buttonVariants({ variant: "secondary" })}>
            Sign Up
          </RegisterLink>
        </div>
      )}
    </nav>
  );
}
