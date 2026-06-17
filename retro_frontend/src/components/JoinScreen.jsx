import { useState } from "react";
import { useBoard } from "../context/BoardContext";

const JoiningScreen = () => {
  const [text, setText] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const { handleNewBoard, handleUsername } = useBoard();

  const createRandomRoomId = () => {
    const randomId = Math.random().toString(36).substring(2, 9);
    handleNewBoard(randomId);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        gap: "24px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #c4c7c5",
            borderRadius: "16px",
            padding: "0 16px",
            height: "48px",
            width: "320px",
          }}
        >
          <input
            type="text"
            placeholder="Enter your username"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              width: "100%",
              fontSize: "16px",
            }}
          />
        </div>
        <button
          onClick={() => {
            if (!text.trim()) return;
            handleUsername(text);
            setText("");
          }}
          style={{
            background: "transparent",
            border: "none",
            color: "#5f6368",
            fontSize: "16px",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Submit
        </button>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <button
          onClick={createRandomRoomId}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#1a73e8",
            color: "#fff",
            border: "none",
            borderRadius: "999px",
            padding: "12px 20px",
            fontSize: "16px",
            fontWeight: "500",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          <span>New Board</span>
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #c4c7c5",
            borderRadius: "16px",
            padding: "0 16px",
            height: "48px",
            width: "320px",
          }}
        >
          <input
            type="text"
            placeholder="Enter a code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              width: "100%",
              fontSize: "16px",
            }}
          />
        </div>
        <button
          onClick={() => {
            if (!roomCode.trim()) return;
            handleNewBoard(roomCode);
            setRoomCode("");
          }}
          style={{
            background: "transparent",
            border: "none",
            color: "#5f6368",
            fontSize: "16px",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default JoiningScreen;
