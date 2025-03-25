import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Chat() {
  const [messages, setMessages] = useState<{ username: string; message: string }[]>([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let ws: WebSocket;

  useEffect(() => {
    ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("Connected to WebSocket");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "previousMessages") {
        setMessages(data.messages);
      } else if (data.type === "newMessage") {
        setMessages((prev) => [...prev, data.message]);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() && ws) {
      ws.send(JSON.stringify({ token, message }));
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Chat Room</h1>
        <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={() => navigate("/")}>
          Back to Dashboard
        </button>
      </div>

      <div className="flex-1 overflow-y-auto bg-white p-4 border rounded">
        {messages.map(({ username, message }, index) => (
          <p key={index} className="mb-2">
            <strong>{username}:</strong> {message}
          </p>
        ))}
      </div>

      <div className="flex mt-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded"
        />
        <button onClick={sendMessage} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
          Send
        </button>
      </div>
    </div>
  );
}
