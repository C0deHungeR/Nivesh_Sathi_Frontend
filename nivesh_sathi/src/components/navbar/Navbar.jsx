"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("userName");

    if (token && name) {
      setUser({ name });
    } else {
      setUser(null);
    }
  }, []);



  

  return (
    <header className="border-b bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Left: nav controls + logo */}
        <div className="flex items-center gap-4">
          {/* Back button */}
          

          {/* Logo */}
          <div className="flex items-center gap-2 text-xl font-bold ml-2">
            <span className="text-emerald-600">🧠</span>
            <span>WealthMind</span>
          </div>
        </div>

        {/* Links */}
        <div className="hidden md:flex gap-8 text-sm text-slate-600">
          <Link href="/fund-analytics">Fund Analytics</Link>
          <Link href="/ai-recommendation">AI Recommendations</Link>
          <Link href="/risk-simulator">Risk Simulator</Link>
          <Link href="#">How AI Works</Link>
        </div>

        {/* Auth Area */}
        {!user ? (
          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Log in
            </Link>

            <Link
              href="/auth/signup"
              className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-medium text-sm"
            >
              Sign up
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="h-9 w-9 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-medium text-slate-700">
              {user.name}
            </span>
          </div>
        )}
      </nav>
    </header>
  );
}
