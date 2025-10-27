import { Navbar } from "../../components/common/Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function LandingPage() {
	const navigate = useNavigate();
	const [roomId, setRoomId] = useState("");

	const join = () => {
		if (!roomId) return;
		navigate(`/chat/${roomId}`);
	};

	const createAndJoin = () => {
		const id = Math.random().toString(36).slice(2, 10);
		navigate(`/chat/${id}`);
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
						style={{ flex: 1, padding: 8 }}
					/>
					<button onClick={join} style={{ padding: "8px 12px" }}>
						Join
					</button>
					<button onClick={createAndJoin} style={{ padding: "8px 12px" }}>
						Create & Join
					</button>
				</div>

				<p style={{ marginTop: 12, color: "#666" }}>
					Tip: Use "Create & Join" to generate a random anonymous room id you can share with others.
				</p>
			</section>
		</div>
	);
}
