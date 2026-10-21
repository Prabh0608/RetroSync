import Column from "./components/Column";
import BoardProvider from "./context/BoardContext";
import JoiningScreen from "./components/JoinScreen";
import { DragDropContext } from "@hello-pangea/dnd";
import { useBoard } from "./context/BoardContext";
import "./css/app.css";
import "./css/button.css";

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
      <div className="loading-screen">
        <div className="loading-spinner" />
        <h3 className="loading-title">
          Waking up real-time server...
        </h3>
        <p className="loading-message">
          We use a free hosting tier. It may take up to 60 seconds for the
          backend engines to initialize. Thank you for your patience!
        </p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="board-header">
        <div className="room-controls">
          <button onClick={handleResetRoom} className="button button-back">
            ← Back
          </button>
          <span className="room-id">
            RoomID:{" "}
            <span className="room-id-value">{roomID}</span>
          </span>
        </div>

        <div className="active-users">
          <span className="active-users-label">Active Users:</span>
          {users.slice(0, 4).map((user, idx) => {
            const isMe = user === username;
            return (
              <span
                key={idx}
                className={`user-badge ${isMe ? "user-badge-current" : ""}`}
              >
                {user}{" "}
                {isMe && <span className="user-badge-you">(you)</span>}
              </span>
            );
          })}
          {users.length > 4 && (
            <span className="user-badge user-badge-more">
              +{users.length - 4}
            </span>
          )}
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="board-grid">
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
