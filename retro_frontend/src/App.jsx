import Column from "./components/Column";
import BoardProvider from "./context/BoardContext";
import JoiningScreen from "./components/JoinScreen";
import { DragDropContext } from "@hello-pangea/dnd";
import { useBoard } from "./context/BoardContext";

function BoardContent() {
  const {
    roomID,
    isSocketConnected,
    handleDragEnd,
    handleResetRoom,
    users,
    username,
  } = useBoard();

  if (!roomID) {
    return <JoiningScreen />;
  }

  if (roomID && !isSocketConnected) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          fontFamily: "system-ui, sans-serif",
          backgroundColor: "#f8fafc",
        }}
      >
        <div
          style={{
            border: "4px solid #e2e8f0",
            borderTop: "4px solid #3b82f6",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            animation: "spin 1s linear infinite",
          }}
        />
        <h3 style={{ marginTop: "24px", color: "#1e293b" }}>
          Waking up real-time server...
        </h3>
        <p
          style={{
            color: "#64748b",
            fontSize: "14px",
            maxWidth: "340px",
            textAlign: "center",
            margin: "8px 0 0 0",
            lineHeight: "1.5",
          }}
        >
          We use a free hosting tier. It may take up to 60 seconds for the
          backend engines to initialize. Thank you for your patience!
        </p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          paddingBottom: "12px",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            onClick={handleResetRoom}
            style={{
              padding: "8px 14px",
              backgroundColor: "#f3f4f6",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            ← Back
          </button>
          <span style={{ fontSize: "16px", fontWeight: "600" }}>
            RoomID:{" "}
            <span style={{ fontWeight: "400", color: "#4b5563" }}>
              {roomID}
            </span>
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{ fontSize: "14px", color: "#6b7280", fontWeight: "500" }}
          >
            Active Users:
          </span>
          {users.slice(0, 4).map((user, idx) => {
            const isMe = user === username;
            return (
              <span
                key={idx}
                style={{
                  fontSize: "14px",
                  backgroundColor: isMe ? "#f3e8ff" : "#eff6ff",
                  color: isMe ? "#6b21a8" : "#1e40af",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  border: isMe ? "1px solid #e9d5ff" : "1px solid #bfdbfe",
                  fontWeight: "500",
                }}
              >
                {user}{" "}
                {isMe && (
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "400",
                      opacity: 0.8,
                    }}
                  >
                    (you)
                  </span>
                )}
              </span>
            );
          })}
          {users.length > 4 && (
            <span
              style={{
                fontSize: "14px",
                backgroundColor: "#f3f4f6",
                color: "#374151",
                padding: "4px 10px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
                fontWeight: "600",
              }}
            >
              +{users.length - 4}
            </span>
          )}
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            width: "100%",
          }}
        >
          <Column title="went-well" />
          <Column title="to-improve" />
          <Column title="action-items" />
        </div>
      </DragDropContext>
    </div>
  );
}

function App() {
  return (
    <BoardProvider>
      <BoardContent />
    </BoardProvider>
  );
}

export default App;
