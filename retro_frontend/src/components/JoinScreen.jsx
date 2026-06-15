import { useBoard } from "../context/BoardContext";

const JoiningScreen = () => {
  const { handleNewBoard } = useBoard();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <button
          onClick={() => handleNewBoard()}
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
            style={{
              border: "none",
              outline: "none",
              width: "100%",
              fontSize: "16px",
            }}
          />
        </div>
        <button
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
