"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "@/styles/login-form.css";

import { login } from "@/services/auth";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const res = await login(username, password);

      if (!res.success) {
        setError(res.message);
        setLoading(false);
        return;
      }

      localStorage.setItem(
        "auth_user",
        JSON.stringify(res.data)
      );

      // Redirect ke dashboard
      router.push("/dashboard");

    } catch (err: any) {
      setError("Gagal menghubungi server");
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        {/* LEFT SIDE */}
        <div className="login-left">
          <Image
            src="/logo-sekolah.jpg"
            alt="Logo Sekolah"
            width={90}
            height={90}
            className="logo-img"
          />

          <div className="app-identity">
            <h1>Aplikasi SPJ BOS</h1>
            <p>
              SMAS BINA BANGSA
              <br />
              SUNGAI RAYA
            </p>
          </div>
        </div>

        {/* SEPARATOR */}
        <div className="separator" />

        {/* RIGHT SIDE */}
        <div className="login-right">
          <h2>Login</h2>

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Masuk"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
