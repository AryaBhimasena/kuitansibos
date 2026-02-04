"use client";

import { useState } from "react";
import Image from "next/image";
import "@/styles/login-form.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    setTimeout(() => {
      alert("Login diproses");
      setLoading(false);
    }, 1500);
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
            <h1>Aplikasi Kuitansi</h1>
            <p>SMAS BINA BANGSA<br />SUNGAI RAYA</p>
          </div>
        </div>

        {/* SEPARATOR */}
        <div className="separator" />

        {/* RIGHT SIDE */}
        <div className="login-right">
          <h2>Login</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
