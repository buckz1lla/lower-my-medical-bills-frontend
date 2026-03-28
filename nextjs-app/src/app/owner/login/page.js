"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

function OwnerLoginContent() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/owner/analytics";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/admin/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload?.detail || "Login failed");
      }

      router.replace(returnTo);
    } catch (submitError) {
      setError(submitError.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="content-page owner-login-page-next">
      <section className="content-card owner-login-card-next">
        <h1>Owner Analytics Login</h1>
        <p>Enter your owner password to access analytics.</p>
        <form onSubmit={handleSubmit} className="owner-login-form-next">
          <label htmlFor="owner-password">Password</label>
          <input
            id="owner-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          {error ? <p className="owner-login-error-next">{error}</p> : null}
          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default function OwnerLoginPage() {
  return (
    <Suspense>
      <OwnerLoginContent />
    </Suspense>
  );
}
