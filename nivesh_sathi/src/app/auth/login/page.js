"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../../lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = await login(form);

    // store auth state
    localStorage.setItem("token", token);

    // TEMP name source (we'll replace with backend profile later)
    localStorage.setItem(
      "userName",
      form.email.split("@")[0]
    );

    router.push("/"); // go to home
  } catch (err) {
    alert("Invalid credentials");
  }
};



  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-center">
        Welcome back 👋
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <button className="w-full bg-green-500 text-white py-2 rounded-lg">
          Login
        </button>
      </form>
    </>
  );
}
