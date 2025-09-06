"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [footerOpen, setFooterOpen] = useState(false);
  const router = useRouter();

  const validate = () => {
    let valid = true;

    if (!username) {
      setUsernameError("Please enter your username.");
      valid = false;
    } else if (username.length < 3) {
      setUsernameError("Username must be three (3) characters long.");
      valid = false;
    } else {
      setUsernameError("");
    }

    if (!password) {
      setPasswordError("Please enter your password.");
      valid = false;
    } else if (password.length < 3) {
      setPasswordError("Password must be three (3) characters long.");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  };

  const login = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        alert("Login failed. Please check your credentials.");
        return;
      }

      const data = await res.json();
      if (data.token && data.refreshToken) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshAuth", data.refreshToken);
        router.push("/home");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      {/* Header */}
      <header className="p-6 flex items-center justify-between bg-white shadow">
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="logo" className="w-12 h-12 rounded-full" />
          <img src="/lettering.png" alt="NurSYNC" className="h-8" />
        </div>
        <button
          className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          onClick={() => setChatOpen(true)}
        >
          AI Chat
        </button>
      </header>

      {/* Login Form */}
      <main className="flex-grow flex items-center justify-center">
        <div className="bg-white shadow rounded-xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Log-in</h2>

          <div className="mb-4">
            <label className="block mb-1">Username</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {usernameError && (
              <p className="text-red-600 text-sm mt-1">{usernameError}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <p className="text-red-600 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          <button
            onClick={login}
            disabled={loading}
            className="w-full py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Logging in..." : "Log-in"}
          </button>
        </div>
      </main>

      {/* Footer Toggle */}
      <footer className="bg-gray-900 text-gray-200 p-4">
        <button
          onClick={() => setFooterOpen(!footerOpen)}
          className="text-sm underline"
        >
          {footerOpen ? "Hide Footer" : "Show Footer"}
        </button>

        {footerOpen && (
          <div className="mt-4 space-y-2 text-sm">
            <p>© 2025 NurSYNC. All rights reserved.</p>
            <p>Made with ❤️ using Next.js & Tailwind</p>
          </div>
        )}
      </footer>

      {/* AI Chat Window */}
      {chatOpen && (
        <div className="fixed bottom-4 right-4 w-80 h-96 bg-white shadow-xl rounded-xl flex flex-col">
          <div className="bg-green-600 text-white p-3 flex justify-between items-center rounded-t-xl">
            <span className="font-semibold">NurSYNC AI</span>
            <button onClick={() => setChatOpen(false)}>✕</button>
          </div>
          <div className="flex-grow p-4 overflow-y-auto space-y-2 text-sm">
            <p className="text-gray-600">AI: Hello, how can I help you?</p>
          </div>
          <div className="p-3 border-t flex space-x-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-grow border rounded px-3 py-1"
            />
            <button className="px-3 py-1 bg-green-600 text-white rounded">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
