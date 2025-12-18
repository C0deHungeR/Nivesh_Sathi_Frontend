"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "../../../lib/api";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    profession: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup(form);
      router.push("/auth/login");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-center">
        Create your account 🚀
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg"
        />

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

        <select
          name="profession"
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg"
        >
          <option value="">Select Profession</option>
          <option>Student</option>
          <option>Working Professional</option>
          <option>Investor</option>
        </select>

        <button className="w-full bg-green-500 text-white py-2 rounded-lg">
          Sign Up
        </button>
      </form>
    </>
  );
}
