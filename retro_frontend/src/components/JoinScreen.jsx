import { useState } from "react";
import { useBoard } from "../context/BoardContext";

const JoiningScreen = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const { handleNewBoard, handleUsername } = useBoard();

  const getFinalUsername = () => {
    return !usernameInput || usernameInput.trim() === ""
      ? "anonymous"
      : usernameInput.trim();
  };

  const createRandomRoomId = () => {
    const finalName = getFinalUsername();
    handleUsername(finalName);

    const randomId = Math.random().toString(36).substring(2, 9);
    handleNewBoard(randomId, finalName);
  };

  const handleJoinExisting = () => {
    if (!roomCode.trim()) return;

    const finalName = getFinalUsername();
    handleUsername(finalName);

    handleNewBoard(roomCode.trim(), finalName);
    setRoomCode("");
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
          placeholder="Enter your username (optional)"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
          style={{
            border: "none",
            outline: "none",
            width: "100%",
            fontSize: "16px",
          }}
        />
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
          onClick={handleJoinExisting}
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
