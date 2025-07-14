"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("http://localhost:5000/api/employees/login", {
        email,
        password,
      });

      const token = res.data.token;
      localStorage.setItem("employeeToken", token);

      setSuccess("Login successful!");
      router.push("/taskmangepage"); // ✅ Redirect after login
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Login failed:", err.response?.data || err.message);
        setError(err.response?.data?.error || "Login failed. Please try again.");
      } else {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred");
      }
    }
  };

  return (
<section className="min-h-screen flex items-start justify-center pt-27 px-4 sm:px-6 bg-white ">
  <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
    <div className="text-center">
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
        Welcome back
      </h1>
    </div>

    <form onSubmit={handleLogin} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="form-input w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3ED2D2]"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="form-input w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3ED2D2]"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">{success}</p>}

      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-t from-[#004AAD] to-[#3ED2D2] text-white rounded-md hover:from-[#00367F] hover:to-[#2BBABA] transition-all duration-300"
      >
        Sign in
      </button>
    </form>
  </div>
</section>

  );
}
