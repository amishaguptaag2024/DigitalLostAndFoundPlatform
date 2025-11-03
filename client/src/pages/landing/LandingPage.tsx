import { Navbar } from "../../components/common/Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../../lib/api";

export function LandingPage() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const join = async () => {
    if (!roomId.trim()) {
      setError("Please enter a room ID");
      return;
    }
    setLoading(true);
    setError("");
    try {
      // Try to fetch messages to verify room exists
      // If room doesn't exist, we'll still navigate and it will be created when first message is sent
      try {
        await api.getMessages(roomId.trim());
      } catch (err) {
        // Room might not exist yet, but that's okay - it will be created when first message is sent
        console.log("Room may not exist yet, will be created on first message");
      }
      navigate(`/chat/${roomId.trim()}`);
    } catch (err) {
      console.error("Failed to join room:", err);
      setError("Failed to join room. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const createAndJoin = async () => {
    setLoading(true);
    setError("");
    try {
      // Create a new room
      const room = await api.createRoom();
      navigate(`/chat/${room._id}`);
    } catch (err) {
      console.error("Failed to create room:", err);
      setError("Failed to create room. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <Navbar />
      <h1>Landing Page</h1>

      <section style={{ marginTop: 24, maxWidth: 600 }}>
        <h3>Anonymous Chat (U5)</h3>
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <input
            placeholder="Enter room id to join"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") join();
            }}
            disabled={loading}
            style={{ flex: 1, padding: 8 }}
          />
          <button
            onClick={join}
            disabled={loading}
            style={{
              padding: "8px 12px",
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Loading..." : "Join"}
          </button>
          <button
            onClick={createAndJoin}
            disabled={loading}
            style={{
              padding: "8px 12px",
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Loading..." : "Create & Join"}
          </button>
        </div>

        {error && (
          <p style={{ marginTop: 12, color: "#dc2626", fontSize: 14 }}>
            {error}
          </p>
        )}

        <p style={{ marginTop: 12, color: "#666" }}>
          Tip: Use "Create & Join" to create a new anonymous chat room. Share
          the room ID with others to chat together.
        </p>
      </section>
    </div>
  );
}
