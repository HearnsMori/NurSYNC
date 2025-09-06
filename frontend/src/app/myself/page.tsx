"use client";
import { useState } from "react";

export default function Home() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");

  // Custom Alert
  const customAlert = (message: string) => {
    setAlertMessage(message);
    setAlertVisible(true);
  };

  // Send Message
  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user" as const, text: input };
    setMessages((prev) => [...prev, userMsg]);
    const msgText = input;
    setInput("");

    // Fake AI reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot" as const, text: `I'm NurSYNC AI. You said: ${msgText}` },
      ]);
    }, 600);
  };

  return (
    <div className="font-sans min-h-screen flex flex-col">
      {/* Custom Alert */}
      {alertVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
          <div className="w-[300px] bg-white rounded-lg shadow-lg">
            <div className="border-l-8 border-green-600 p-4">
              <div className="text-lg text-green-700 font-semibold">Message</div>
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
        </div>
      )}

      {/* Example Profile/Settings */}
      <main className="flex-grow p-6">
        <h1 className="text-xl font-bold">NurSYNC Settings</h1>
        <button
          onClick={() => customAlert("Profile updated successfully!")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Save Profile
        </button>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-gray-500 text-sm">
        © 2025 NurSYNC
      </footer>

      {/* Floating Chat Button */}
      <div
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-4 right-4 px-3 py-2 bg-white shadow-lg rounded-full flex items-center gap-2 cursor-pointer"
      >
        Chat NurSYNC AI
        <img
          src="/bot.png"
          alt="Bot"
          className="w-8 h-8 rounded-full border-2 border-white"
        />
      </div>

      {/* Chat Window */}
      {chatOpen && (
        <div className="fixed bottom-16 right-4 w-80 h-96 bg-white border border-gray-300 rounded-xl flex flex-col shadow-lg">
          <div className="bg-blue-600 text-white p-2 rounded-t-xl text-center font-bold">
            NurSYNC AI
          </div>
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
              className="flex-1 p-2 rounded-bl-xl border-t border-gray-300 outline-none"
            />
            <button
              onClick={sendMessage}
              className="px-4 bg-blue-600 text-white rounded-br-xl"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
