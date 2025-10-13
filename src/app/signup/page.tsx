"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
  const router = useRouter();
  const { setUser } = useAuth(); // ✅ access setter

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Signup failed");

      // ✅ Save tokens so user is automatically signed in
      localStorage.setItem("accesstoken", data.accessToken);
      localStorage.setItem("refreshtoken", data.refreshToken);

      // ✅ Immediately set user in context
      setUser(data.user);

      router.push("/"); // redirect home
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="grid w-full max-w-md gap-4 rounded-lg bg-white p-8 shadow-md"
      >
        <h1 className="text-center text-2xl font-semibold text-gray-800">
          Create your account
        </h1>

        {error && <p className="mb-4 text-center text-red-600">{error}</p>}

        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-visible:border-blue-500 focus-visible:ring-blue-500 focus-visible:outline-none"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-visible:border-blue-500 focus-visible:ring-blue-500 focus-visible:outline-none"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-visible:border-blue-500 focus-visible:ring-blue-500 focus-visible:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 focus-visible:bg-blue-700 focus-visible:outline-none disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
