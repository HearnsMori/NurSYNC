"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LearningHub() {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const router = useRouter();

  const customAlert = (message: string) => {
    setAlertMessage(message);
  };

  const closeAlert = () => {
    setAlertMessage(null);
  };

  return (
    <div>
      {/* Custom Alert */}
      {alertMessage && (
        <div
          style={{
            display: "block",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "300px",
            background: "white",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
            zIndex: 1000,
          }}
        >
          <div style={{ borderLeft: "8px solid #16a34a", padding: "20px" }}>
            <div
              style={{
                fontSize: "18px",
                color: "#15803d",
                fontWeight: 600,
              }}
            >
              Message
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "#1f2937",
                marginTop: "8px",
              }}
            >
              {alertMessage}
            </div>
            <div style={{ marginTop: "16px", textAlign: "right" }}>
              <button
                onClick={closeAlert}
                style={{
                  padding: "8px 16px",
                  border: "none",
                  background: "#16a34a",
                  color: "white",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div id="ratio16_9">
        <div
          className="flexR fixed"
          style={{ height: "12vw", top: "-1.2vw", left: "5vw", zIndex: 3 }}
        >
          <div style={{ width: "10vw", marginTop: "2vw" }}>
            <img
              className="circle medium"
              style={{ background: "white", border: "solid white 0.3vw" }}
              src="/logo.png"
              alt="Logo"
            />
          </div>
          <div
            className="flexC"
            style={{ justifyContent: "left", alignItems: "left" }}
          >
            <img
              style={{ height: "8vw", width: "17vw" }}
              src="/lettering.png"
              alt="Lettering"
            />
          </div>
        </div>

        <div id="header" className="green" style={{ zIndex: 2 }}>
          <div className="flex"></div>
          <div className="flexR">
            <div
              className="bold"
              style={{
                background: "green",
                fontSize: "1.2vw",
                width: "11vw",
                borderBottom: "solid 0.2vw white",
                marginBottom: "1.5vw",
                paddingTop: "2vw",
              }}
            >
              {/* Example SVG */}
              <svg
                width="6vw"
                height="6vw"
                viewBox="-10.88 -10.88 53.76 53.76"
                fill="#ff37ff"
                stroke="#ff37ff"
                strokeWidth="0.128"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M30,22v3c0,0.552-0.448,1-1,1h-1c-0.552,0-1-0.448-1-1v-3..." />
              </svg>
              Learning Hub
            </div>

            <div
              style={{ fontSize: "1.2vw", width: "11vw", cursor: "pointer" }}
              onClick={() => router.push("/task")}
            >
              Task
            </div>

            <div
              style={{ fontSize: "1.2vw", width: "11vw", cursor: "pointer" }}
              onClick={() => router.push("/flashcard")}
            >
              Flashcard
            </div>

            <div
              style={{ fontSize: "1.2vw", width: "11vw", cursor: "pointer" }}
              onClick={() => router.push("/myself")}
            >
              Settings
            </div>
          </div>

          {/* Log-out Button */}
          <div>
            <button
              className="signinBtn smallMarginRight"
              style={{ background: "#ed3737", color: "white" }}
              onClick={() => {
                localStorage.clear();
                router.push("/");
              }}
            >
              Log-out
            </button>
          </div>
        </div>

        {/* Example Title Section */}
        <div className="flexC" style={{ marginTop: "11vw" }}>
          <div
            className="txtlarge bold flexR"
            style={{ alignItems: "center" }}
          >
            <svg
              style={{ width: "5vw", height: "5vw", marginRight: "1vw" }}
              fill="#000000"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M18 2H6a2 2 0 0 0-2 2v16c0 .6.4 1 1 1s1-.4 1-1V4h12v16H8v2h10a2 2 0 0 0 2-2V4c0-1.1-.9-2-2-2z" />
            </svg>
            Learning Hub
          </div>
        </div>
      </div>
    </div>
  );
}
