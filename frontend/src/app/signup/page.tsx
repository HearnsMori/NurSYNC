"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  // Form state
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    middlename: "",
    university: "",
    studentid: "",
    emailaddress: "",
    username: "",
    password: "",
    confirmpassword: "",
    agree: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Alert state
  const [alert, setAlert] = useState<string | null>(null);

  // Footer toggle
  const [footerVisible, setFooterVisible] = useState(false);

  // Chat state
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([]);
  const [chatInput, setChatInput] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        router.push("/");
      }
    }
  }, [router]);

  // Handle form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  // Validate inputs
  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.firstname.trim()) newErrors.firstname = "First Name must not be empty.";
    else if (form.firstname.includes(" ")) newErrors.firstname = "First Name must not have white space.";
    else if (form.firstname.length < 3) newErrors.firstname = "First Name must be three (3) characters long.";

    if (!form.lastname.trim()) newErrors.lastname = "Last Name must not be empty.";
    else if (form.lastname.includes(" ")) newErrors.lastname = "Last Name must not have white space.";
    else if (form.lastname.length < 3) newErrors.lastname = "Last Name must be three (3) characters long.";

    if (!form.university.trim()) newErrors.university = "University must not be empty.";
    else if (form.university.length < 3) newErrors.university = "University must be three (3) characters long.";

    if (!form.studentid.trim()) newErrors.studentid = "Student ID must not be empty.";
    else if (form.studentid.includes(" ")) newErrors.studentid = "Student ID must not have white space.";
    else if (form.studentid.length < 3) newErrors.studentid = "Student ID must be three (3) characters long.";

    if (!form.emailaddress.trim()) newErrors.emailaddress = "Email Address must not be empty.";
    else if (form.emailaddress.includes(" ")) newErrors.emailaddress = "Email Address must not have white space.";
    else if (form.emailaddress.length < 3) newErrors.emailaddress = "Email Address must be three (3) characters long.";

    if (!form.username.trim()) newErrors.username = "Username must not be empty.";
    else if (form.username.includes(" ")) newErrors.username = "Username must not have white space.";
    else if (form.username.length < 3) newErrors.username = "Username must be three (3) characters long.";

    if (!form.password.trim()) newErrors.password = "Password must not be empty.";
    else if (form.password.includes(" ")) newErrors.password = "Password must not have white space.";
    else if (form.password.length < 3) newErrors.password = "Password must be three (3) characters long.";

    if (form.password !== form.confirmpassword) newErrors.confirmpassword = "Passwords do not match.";

    if (!form.agree) newErrors.agree = "You must agree to terms, policy, and privacy.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle signup
  const signup = async () => {
    if (!validate()) return;

    try {
      const response = await fetch("https://nursync.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data.error) {
        setAlert(data.error);
      } else {
        setAlert("Successfully created an Account. You may now Log-in.");
        router.push("/login");
      }
    } catch (error) {
      setAlert("Fetch Error: Try Again. " + error);
    }
  };

  // Chat functions
  const sendMessage = async () => {
    if (!chatInput.trim()) return;
    const userMessage = chatInput.trim();
    setChatMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setChatInput("");

    try {
      const response = await fetch("https://nursync.onrender.com/api/bot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMessage }),
      });
      const data = await response.json();

      // Typing effect
      let i = 0;
      const interval = setInterval(() => {
        setChatMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last && last.sender === "bot") {
            return [...prev.slice(0, -1), { sender: "bot", text: last.text + data.msg.charAt(i) }];
          } else {
            return [...prev, { sender: "bot", text: data.msg.charAt(i) }];
          }
        });
        i++;
        if (i >= data.msg.length) clearInterval(interval);
      }, 37);
    } catch {
      setChatMessages((prev) => [...prev, { sender: "bot", text: "Error: Unable to get response from AI" }]);
    }
  };

  return (
    <div style={{ background: "url('/signup.png')", height: "100vh", overflowY: "auto", paddingBottom: "7vw" }}>
      {/* Custom Alert */}
      {alert && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            background: "white",
            borderRadius: 10,
            boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
            zIndex: 1000,
          }}
        >
          <div style={{ borderLeft: "8px solid #16a34a", padding: 20 }}>
            <div style={{ fontSize: 18, color: "#15803d", fontWeight: 600 }}>Message</div>
            <div style={{ fontSize: 14, color: "#1f2937", marginTop: 8 }}>{alert}</div>
            <div style={{ marginTop: 16, textAlign: "right" }}>
              <button
                onClick={() => setAlert(null)}
                style={{ padding: "8px 16px", border: "none", background: "#16a34a", color: "white", borderRadius: 6, cursor: "pointer" }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Signup Form */}
      <div style={{ background: "white", borderRadius: "3vw", margin: "2vw 8vw", width: "84vw", padding: "3vw" }}>
        <h1>Create an Account</h1>
        <p>
          Already have an Account? <a href="/login">Log-in</a>
        </p>
        {["firstname", "lastname", "middlename", "university", "studentid", "emailaddress", "username", "password", "confirmpassword"].map(
          (field) => (
            <div key={field} style={{ margin: "1vw 0" }}>
              <input
                id={field}
                type={field.includes("password") ? "password" : "text"}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={(form as any)[field]}
                onChange={handleChange}
                style={{ width: "100%", padding: "1vw", borderRadius: 6, border: "1px solid #ccc" }}
              />
              {errors[field] && <small style={{ color: "red" }}>{errors[field]}</small>}
            </div>
          )
        )}
        <div>
          <input id="agree" type="checkbox" checked={form.agree} onChange={handleChange} /> Agree to terms, policy, and privacy
          {errors.agree && <small style={{ color: "red", display: "block" }}>{errors.agree}</small>}
        </div>
        <button
          type="button"
          onClick={signup}
          style={{ marginTop: "2vw", background: "#008040", color: "white", padding: "1vw 2vw", border: "none", borderRadius: "4vw" }}
        >
          Register
        </button>
      </div>

      {/* Footer */}
      <div
        style={{
          position: "fixed",
          bottom: footerVisible ? 0 : "-100%",
          width: "100%",
          background: "#008040",
          color: "white",
          padding: "3vw 0",
          transition: "bottom 0.3s ease",
        }}
      >
        <div style={{ paddingLeft: "6vw", fontSize: "4vw", fontWeight: "bold" }}>NurSYNC</div>
        <div style={{ paddingLeft: "6vw", marginTop: "3vw" }}>
          <a href="/" style={{ color: "white", marginRight: "5vw" }}>
            Home
          </a>
          <a href="/signup" style={{ color: "white", marginRight: "5vw" }}>
            Signup
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=your-email@gmail.com"
            target="_blank"
            style={{ color: "white" }}
          >
            Send me a message
          </a>
        </div>
        <hr style={{ border: "0.2px solid #ccc", width: "90%", marginTop: "5vw" }} />
        <div style={{ paddingLeft: "6vw", fontSize: "2vw", marginTop: "2vw", color: "#ddd" }}>© 2025 NurSynergy</div>
      </div>

      {/* Footer Toggle */}
      <div
        onClick={() => setFooterVisible((v) => !v)}
        style={{
          position: "fixed",
          bottom: 10,
          right: 10,
          background: "#008040",
          color: "white",
          padding: 10,
          borderRadius: 5,
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        {footerVisible ? "Hide Footer" : "Show Footer"}
      </div>

      {/* Chat Button */}
      <div
        onClick={() => setChatOpen((o) => !o)}
        style={{
          padding: "0 1vw",
          background: "white",
          borderRadius: "3vw",
          display: "flex",
          alignItems: "center",
          position: "fixed",
          bottom: "3vw",
          left: "3vw",
          cursor: "pointer",
        }}
      >
        Chat NurSYNC AI <img src="/bot.png" style={{ width: "24px", height: "24px", marginLeft: "0.5vw" }} />
      </div>

      {/* Chat Window */}
      {chatOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "7vw",
            left: "2vw",
            width: "33vw",
            height: "40vw",
            background: "white",
            border: "0.5vw solid #ccc",
            borderRadius: "2vw",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ background: "#007bff", color: "white", padding: "1vw", borderRadius: "1vw" }}>NurSYNC AI</div>
          <div style={{ flexGrow: 1, overflowY: "auto", padding: "1vw", borderBottom: "0.5vw solid #ccc" }}>
            {chatMessages.map((msg, i) => (
              <div key={i} style={{ textAlign: msg.sender === "user" ? "right" : "left", margin: "0.5vw 0" }}>
                <span style={{ background: msg.sender === "user" ? "#e0ffe0" : "#f0f0f0", padding: "0.5vw 1vw", borderRadius: 6 }}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            style={{ padding: "1vw", border: "none", borderRadius: "1vw" }}
          />
        </div>
      )}
    </div>
  );
}
