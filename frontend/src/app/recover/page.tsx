"use client";
import { useEffect, useState } from "react";

// If you want to use EmailJS in React
import emailjs from "@emailjs/browser";

export default function RecoverPage() {
  // State
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [footerVisible, setFooterVisible] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");

  // Custom alert
  const customAlert = (msg: string) => {
    setAlertMessage(msg);
    setAlertVisible(true);
  };

  // EmailJS
  const sendEmail = () => {
    if (!email.trim()) {
      customAlert("Please enter an email address");
      return;
    }
    const generatedCode = Math.floor(1000 + Math.random() * 8999).toString();
    localStorage.setItem("code", generatedCode);

    const templateParams = {
      to_email: email,
      from_name: "NurSYNC",
      message: `Verification for NurSYNC Account Recovery: ${generatedCode}`,
    };

    emailjs
      .send("service_yw9bo2o", "template_0gpmw4c", templateParams, "ZzqOpXr_hYVLaWCKy")
      .then(() => {
        customAlert("Code was sent to your account");
      })
      .catch(() => {
        customAlert("Error while sending the code. Make sure email address exists.");
      });
  };

  // Recover
  const recover = async () => {
    let newErrors: Record<string, string> = {};

    if (!username.trim()) newErrors.username = "Username must not be empty.";
    else if (username.includes(" ")) newErrors.username = "Username must not have whitespace.";
    else if (username.length < 3) newErrors.username = "Username must be at least 3 characters.";

    if (!email.trim()) newErrors.email = "Email must not be empty.";
    else if (email.includes(" ")) newErrors.email = "Email must not have whitespace.";
    else if (email.length < 3) newErrors.email = "Email must be at least 3 characters.";

    if (!password.trim()) newErrors.password = "Password must not be empty.";
    else if (password.includes(" ")) newErrors.password = "Password must not have whitespace.";
    else if (password.length < 3) newErrors.password = "Password must be at least 3 characters.";

    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await fetch("https://nursync.onrender.com/api/auth/recover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, emailaddress: email, password }),
      });
      const data = await res.json();
      if (data.error) {
        customAlert(data.error);
      } else {
        customAlert("Recovery successful!");
      }
    } catch {
      customAlert("Fetch Error: Try Again.");
    }
  };

  // Chat
  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user" as const, text: input };
    setMessages((prev) => [...prev, userMsg]);

    const msgText = input;
    setInput("");

    try {
      const response = await fetch("https://nursync.onrender.com/api/bot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: msgText }),
      });
      const data = await response.json();
      appendBotMessage(data.msg);
    } catch {
      appendBotMessage("Error: Unable to get response from AI");
    }
  };

  const appendBotMessage = (text: string) => {
    let i = 0;
    const interval = setInterval(() => {
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last && last.sender === "bot") {
          return [...prev.slice(0, -1), { sender: "bot", text: last.text + text[i] }];
        } else {
          return [...prev, { sender: "bot", text: text[i] }];
        }
      });
      i++;
      if (i >= text.length) clearInterval(interval);
      return [];
    });
  };

  // Redirect if already logged in
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("token")) {
      window.location.href = "../";
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/recover.png')" }}>
      {/* Alert */}
      {alertVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white w-80 rounded-lg shadow-lg border-l-8 border-green-600 p-4">
            <div className="text-lg font-semibold text-green-700">Message</div>
            <div className="text-sm text-gray-800 mt-2">{alertMessage}</div>
            <div className="mt-4 text-right">
              <button
                onClick={() => setAlertVisible(false)}
                className="px-4 py-2 bg-green-600 text-white rounded-md"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Center card */}
      <div className="flex justify-center items-center pt-12">
        <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg">
          <div className="flex justify-center mb-4">
            <img src="/bglettering.png" alt="Logo" className="w-40 h-12 object-contain rounded-lg" />
          </div>

          <h2 className="text-xl font-bold text-center">Recover Account</h2>
          <p className="text-center text-sm mt-1">
            Don&apos;t have an account? <a href="../signup" className="text-blue-600 underline">Sign up</a>
          </p>

          {/* Username */}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full border p-2 rounded-md mt-4"
          />
          {errors.username && <small className="text-red-600">{errors.username}</small>}

          {/* Email */}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            type="email"
            className="w-full border p-2 rounded-md mt-3"
          />
          {errors.email && <small className="text-red-600">{errors.email}</small>}

          <button
            onClick={sendEmail}
            className="w-full bg-green-600 text-white py-2 rounded-md mt-4"
          >
            Send Code
          </button>

          {/* Code */}
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Code"
            className="w-full border p-2 rounded-md mt-3"
          />

          {/* Password */}
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            type="password"
            className="w-full border p-2 rounded-md mt-3"
          />
          {errors.password && <small className="text-red-600">{errors.password}</small>}

          {/* Confirm Password */}
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            type="password"
            className="w-full border p-2 rounded-md mt-3"
          />
          {errors.confirmPassword && <small className="text-red-600">{errors.confirmPassword}</small>}

          <button
            onClick={recover}
            className="w-full bg-green-600 text-white py-2 rounded-md mt-5"
          >
            Recover
          </button>
        </div>
      </div>

      {/* Footer */}
      {footerVisible && (
        <div className="fixed bottom-0 w-full bg-green-700 text-white p-6 transition-all">
          <div className="font-bold text-lg">NurSYNC</div>
          <div className="mt-3 space-x-4">
            <a href="../" className="underline">Home</a>
            <a href="./signup" className="underline">Signup</a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=your-email@gmail.com&su=Subject%20Here&body=Message%20Body%20Here"
              target="_blank"
              className="underline"
            >
              Send me a message
            </a>
          </div>
          <hr className="my-4 border-gray-300" />
          <div className="text-gray-200 text-sm">© 2025 NurSynergy</div>
        </div>
      )}
      <button
        onClick={() => setFooterVisible(!footerVisible)}
        className="fixed bottom-4 right-4 bg-green-700 text-white px-4 py-2 rounded-md z-50"
      >
        {footerVisible ? "Hide Footer" : "Show Footer"}
      </button>

      {/* Chat button */}
      <div
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-4 left-4 bg-white rounded-full px-3 py-2 shadow cursor-pointer flex items-center gap-2"
      >
        Chat NurSYNC AI <img src="/bot.png" alt="Bot" className="w-6 h-6 rounded-full border" />
      </div>

      {/* Chat window */}
      {chatOpen && (
        <div className="fixed bottom-16 left-4 w-80 h-96 bg-white border rounded-lg flex flex-col shadow-lg z-50">
          <div className="bg-blue-600 text-white p-2 rounded-t-lg text-center font-bold">NurSYNC AI</div>
          <div className="flex-grow p-2 overflow-y-auto space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[70%] ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white ml-auto text-right"
                    : "bg-gray-200 text-black mr-auto text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 border-t p-2 rounded-bl-lg outline-none"
            />
            <button onClick={sendMessage} className="px-4 bg-blue-600 text-white rounded-br-lg">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
