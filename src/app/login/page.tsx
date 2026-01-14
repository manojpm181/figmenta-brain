"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ✅ Clear password on first load / refresh
  useEffect(() => {
    setPassword("");
  }, []);

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (res.ok) {
      setPassword("");              // ✅ clear password
      router.replace("/admin");     // ✅ block back button
    } else {
      setError("Invalid admin password");
      setPassword("");              // ✅ clear on error
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black flex items-center justify-center">

      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 animate-gradient" />

      {/* Blur overlay */}
      <div className="absolute inset-0 backdrop-blur-3xl bg-black/40" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl animate-fade-in">

        {/* Logo */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 h-14 w-14 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
            AI
          </div>
          <h1 className="text-2xl font-bold text-white">
            Admin Login
          </h1>
          <p className="text-sm text-white/70">
            Secure access to AI control panel
          </p>
        </div>

        {/* Input */}
        <div className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            autoComplete="new-password"
            spellCheck={false}
            className="w-full rounded-lg border border-white/20 bg-black/40 px-4 py-3 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />

          {error && (
            <p className="text-sm text-red-400 animate-shake">
              {error}
            </p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 py-3 font-medium text-white transition hover:scale-[1.02] active:scale-95 disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Login"}
          </button>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-white/50">
          Restricted access · Authorized personnel only
        </p>
      </div>
    </div>
  );
}
