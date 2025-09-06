"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  // Custom Alert state
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const customAlert = (message: string) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  // Progress & Tasks
  const [tasks, setTasks] = useState<any[]>([]);
  const [progress, setProgress] = useState(0);

  const filterTasks = (filter: string) => {
    customAlert(`Filtering: ${filter}`);
  };

  const calendarFilter = (date: string) => {
    customAlert(`Calendar filter: ${date}`);
  };

  const postTask = () => {
    customAlert("Task posted!");
  };

  // Chat toggle
  const [chatOpen, setChatOpen] = useState(false);
  const toggleChat = () => setChatOpen(!chatOpen);

  return (
    <div>
      {/* Custom Alert */}
      {showAlert && (
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

      {/* Header */}
      <div id="ratio16_9">
        <div
          className="flexR fixed"
          style={{ height: "12vw", top: "-1.2vw", left: "5vw", zIndex: 3 }}
        >
          <div style={{ width: "10vw", marginTop: "2vw" }}>
            <Image
              className="circle medium"
              style={{ background: "white", border: "solid white 0.3vw" }}
              src="/logo.png"
              alt="logo"
              width={200}
              height={200}
            />
          </div>
          <div
            className="flexC"
            style={{ justifyContent: "left", alignItems: "left" }}
          >
            <Image
              src="/lettering.png"
              alt="lettering"
              width={300}
              height={200}
              style={{ height: "8vw", width: "17vw" }}
            />
          </div>
        </div>

        <div id="header" className="green" style={{ zIndex: 2 }}>
          <div className="flex"></div>
          <div className="flexR">
            <div
              onClick={() => router.push("/learninghub")}
              style={{ fontSize: "1.2vw", width: "11vw", cursor: "pointer" }}
            >
              {/* SVG */}
              Learning Hub
            </div>

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
              Task
            </div>

            <div
              onClick={() => router.push("/flashcard")}
              style={{ fontSize: "1.2vw", width: "11vw", cursor: "pointer" }}
            >
              Flashcard
            </div>

            <div
              onClick={() => router.push("/myself")}
              style={{ fontSize: "1.2vw", width: "11vw", cursor: "pointer" }}
            >
              Settings
            </div>
          </div>

          <div>
            <button className="signinBtn smallMarginRight"
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

        {/* Main Content */}
        <div className="flexC" style={{ marginTop: "11vw" }}>
          <div className="txtlarge bold">Task</div>

          {/* Task Manager */}
          <div
            style={{
              fontFamily: "Arial, sans-serif",
              maxWidth: "90vw",
              margin: "2vw auto",
              padding: "2vw",
              border: "0.2vw solid #ddd",
              borderRadius: "2vw",
              background: "#fff",
            }}
          >
            {/* Filter buttons */}
            <div
              style={{
                display: "flex",
                gap: "2vw",
                justifyContent: "center",
                marginBottom: "2vw",
                flexWrap: "wrap",
              }}
            >
              <button onClick={() => filterTasks("today")}>Today</button>
              <button onClick={() => filterTasks("tomorrow")}>
                Due Tomorrow
              </button>
              <button onClick={() => filterTasks("all")}>View All</button>
              <input
                type="date"
                onChange={(e) => calendarFilter(e.target.value)}
              />
            </div>

            {/* Progress bar */}
            <div style={{ marginBottom: "2vw" }}>
              <div style={{ marginBottom: "1vw" }}>My Progress:</div>
              <div
                style={{
                  background: "#eee",
                  width: "100%",
                  height: "4vw",
                  borderRadius: "2vw",
                  overflow: "hidden",
                }}
              >
                <div
                  id="progress-bar"
                  style={{
                    background: "#4CAF50",
                    height: "100%",
                    width: `${progress}%`,
                  }}
                />
              </div>
              <small style={{ color: "gray", fontSize: "2vw" }}>
                {progress}% complete
              </small>
            </div>

            {/* Task list */}
            <div
              id="task-list"
              style={{ display: "flex", flexDirection: "column", gap: "3vw" }}
            >
              {tasks.length === 0 ? "No tasks yet" : JSON.stringify(tasks)}
            </div>

            {/* Add task */}
            <div>
              <button onClick={postTask}>+</button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flexC green"
          style={{
            width: "100vw",
            padding: "5vw 0",
            background: "#008040",
          }}
        >
          <div
            className="flex"
            style={{
              color: "white",
              justifyContent: "left",
              paddingLeft: "6vw",
              fontSize: "4.5vw",
              fontWeight: "bold",
            }}
          >
            NurSYNC
          </div>
          <div
            className="flex"
            style={{
              justifyContent: "left",
              paddingLeft: "6vw",
              marginTop: "3vw",
            }}
          >
            <a
              style={{ color: "#ffffff", textDecoration: "underline" }}
              href="https://mail.google.com/mail/?view=cm&fs=1&to=your-email@gmail.com"
              target="_blank"
            >
              Send me a message
            </a>
          </div>
          <hr style={{ border: "0.2px solid #CCCCCC", width: "90%", marginTop: "5vw" }} />
          <div
            className="flex"
            style={{
              color: "#dddddd",
              justifyContent: "left",
              paddingLeft: "6vw",
              fontSize: "2.6vw",
              marginTop: "2vw",
            }}
          >
            Philippines
          </div>
          <div
            className="flex"
            style={{
              color: "#dddddd",
              justifyContent: "left",
              paddingLeft: "6vw",
              fontSize: "2.6vw",
              marginTop: "2vw",
            }}
          >
            © 2025 NurSYNC
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <div
        className="txtsmall"
        onClick={toggleChat}
        style={{
          padding: "0 1vw",
          background: "white",
          borderRadius: "3vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          bottom: "3vw",
          right: "3vw",
          cursor: "pointer",
        }}
      >
        Chat NurSYNC AI
        <Image
          className="small circle"
          style={{
            background: "white",
            border: "solid white 0.3vw",
            borderRadius: "2vw",
          }}
          src="/bot.png"
          alt="bot"
          width={40}
          height={40}
        />
      </div>

      {/* Chat Window */}
      {chatOpen && (
        <div
          id="chatBox"
          style={{
            paddingTop: "4vw",
            position: "fixed",
            bottom: "7vw",
            right: "2vw",
            width: "33vw",
            height: "40vw",
            backgroundColor: "#fff",
            border: "0.5vw solid #ccc",
            borderRadius: "2vw",
            display: "flex",
            flexDirection: "column",
            zIndex: 10,
          }}
        >
          <div style={{ background: "#007bff", color: "white" }}>Chat Window</div>
        </div>
      )}
    </div>
  );
}
