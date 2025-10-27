import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

// Simple anonymous chat page that polls the server for new messages every 2 seconds
export const AnonymousChatPage: React.FC = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [senderName] = useState(() => `Anonymous${Math.floor(Math.random() * 9000) + 1000}`);
  const pollingRef = useRef<number | null>(null);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/chat/${roomId}/messages`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchMessages();
    pollingRef.current = window.setInterval(fetchMessages, 2000);
    return () => {
      if (pollingRef.current) window.clearInterval(pollingRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  const handleSend = async () => {
    if (!text.trim()) return;
    try {
      await fetch(`/api/chat/${roomId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senderName, text }),
      });
      setText("");
      fetchMessages();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 16 }}>
      <h2>Anonymous Chat - Room: {roomId}</h2>
      <div style={{ border: "1px solid #ddd", padding: 12, height: 400, overflowY: "auto", marginBottom: 12 }}>
        {messages.map((m) => (
          <div key={m._id} style={{ marginBottom: 8 }}>
            <strong>{m.senderName}</strong>: {m.text}
            <div style={{ fontSize: 12, color: "#666" }}>{new Date(m.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`You are ${senderName}`}
          style={{ flex: 1, padding: 8 }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <button onClick={handleSend} style={{ padding: "8px 12px" }}>
          Send
        </button>
      </div>
    </div>
  );
};
