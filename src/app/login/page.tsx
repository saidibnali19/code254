"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

function LoginPageContent() {
  const { setUser } = useAuth();

  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect") || "/dashboard";

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Store tokens (if returned in response body)
      localStorage.setItem("accesstoken", data.accessToken);
      setUser(data.user);
      router.push(redirect); // 👈 go back to intended page
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-base-300 flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-base-400 text-base-400 grid w-full max-w-md gap-4 rounded-lg p-8 shadow-md"
      >
        <h1 className="text-center text-2xl font-semibold">
          Log in to your account
        </h1>

        {error && <p className="text-center text-red-600">{error}</p>}

        <div className="space-y-2">
          <label className="block text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input bg-base-300 w-full border-gray-700"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input bg-base-300 w-full border-gray-700"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading login page...</div>}>
      <LoginPageContent />
    </Suspense>
  );
}
