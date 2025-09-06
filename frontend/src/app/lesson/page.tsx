"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NurSync() {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const router = useRouter();

  // Show custom alert
  const customAlert = (message: string) => {
    setAlertMessage(message);
  };

  // Close custom alert
  const closeAlert = () => {
    setAlertMessage(null);
  };

  // Simulate your jQuery logic
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("../"); // redirect to parent
    }
    // You can also auto-fullscreen if needed:
    // document.documentElement.requestFullscreen();
  }, [router]);

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
              style={{ fontSize: "18px", color: "#15803d", fontWeight: 600 }}
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

      {/* Content Area */}
      <div id="ratio16_9"></div>

      {/* Example button to trigger alert */}
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <button
          onClick={() => customAlert("Hello from Next.js!")}
          style={{
            padding: "10px 20px",
            border: "none",
            background: "#2563eb",
            color: "white",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Show Alert
        </button>
      </div>
    </div>
  );
}
