import { useState } from "react";
import { useBoard } from "../context/BoardContext";

export default function JoiningScreen() {
  const { handleNewBoard } = useBoard();
  const [name, setName] = useState("");
  const [roomInput, setRoomInput] = useState("");

  const handleJoinExisting = (e) => {
    e.preventDefault();
    if (!roomInput.trim()) return alert("Please enter a Room ID.");
    handleNewBoard(roomInput.trim(), name.trim());
  };

  const handleCreateNew = () => {
    const generatedId = "retro-" + Math.random().toString(36).substring(2, 7);
    handleNewBoard(generatedId, name.trim());
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "#f8fafc",
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "4vw 2vw",
        boxSizing: "border-box",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "clamp(12px, 1.2vw, 14px)",
            color: "#059669",
            fontWeight: "500",
            marginBottom: "0.75rem",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              backgroundColor: "#10b981",
              borderRadius: "50%",
            }}
          ></span>
          real-time engine active
        </div>

        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: "700",
            color: "#111827",
            margin: "0 0 0.75rem 0",
            letterSpacing: "-0.02em",
          }}
        >
          Retro Board
        </h1>

        <p
          style={{
            fontSize: "clamp(14px, 1.8vw, 16px)",
            color: "#4b5563",
            margin: "0 auto",
            maxWidth: "480px",
            lineHeight: "1.6",
          }}
        >
          A full-stack retrospective tool built for seamless, concurrent team
          collaboration. Open a second window to test the instant WebSocket
          state synchronization.
        </p>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: "380px",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}
      >
        <div>
          <label
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "500",
              color: "#374151",
              marginBottom: "0.5rem",
            }}
          >
            Your name
          </label>
          <input
            type="text"
            placeholder="e.g. Riya, Ahmed, Dev..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              background: "#ffffff",
              fontSize: "15px",
              boxSizing: "border-box",
              outline: "none",
              color: "#111827",
            }}
          />
        </div>

        <button
          onClick={handleCreateNew}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#111827",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "opacity 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
          onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Create new board
        </button>
        <div
          style={{ display: "flex", alignItems: "center", margin: "0.5rem 0" }}
        >
          <div
            style={{ flexGrow: 1, height: "1px", backgroundColor: "#e5e7eb" }}
          ></div>
          <span
            style={{ padding: "0 12px", fontSize: "13px", color: "#9ca3af" }}
          >
            or join existing
          </span>
          <div
            style={{ flexGrow: 1, height: "1px", backgroundColor: "#e5e7eb" }}
          ></div>
        </div>

        <form
          onSubmit={handleJoinExisting}
          style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "0.5rem",
              }}
            >
              Room ID
            </label>
            <input
              type="text"
              placeholder="Paste room ID here"
              value={roomInput}
              onChange={(e) => setRoomInput(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                background: "#ffffff",
                fontSize: "15px",
                boxSizing: "border-box",
                outline: "none",
                color: "#111827",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#ffffff",
              color: "#111827",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#f8fafc")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#ffffff")
            }
          >
            Join board
          </button>
        </form>
      </div>
    </div>
  );
}
