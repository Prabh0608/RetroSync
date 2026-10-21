import { useState } from "react";
import { useBoard } from "../context/BoardContext";
import "../css/join-screen.css";
import "../css/button.css";

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
    <div className="join-screen">
      <div className="join-intro">
        <div className="engine-status">
          <span className="engine-status-dot"></span>
          real-time engine active
        </div>

        <h1 className="join-title">Retro Board</h1>

        <p className="join-description">
          A full-stack retrospective tool built for seamless, concurrent team
          collaboration. Open a second window to test the instant WebSocket
          state synchronization.
        </p>
      </div>

      <div className="join-form-container">
        <div>
          <label className="form-label">Your name</label>
          <input
            type="text"
            placeholder="e.g. Riya, Ahmed, Dev..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
          />
        </div>

        <button onClick={handleCreateNew} className="button button-primary">
          Create new board
        </button>
        <div className="join-divider">
          <div className="join-divider-line"></div>
          <span className="join-divider-label">or join existing</span>
          <div className="join-divider-line"></div>
        </div>

        <form onSubmit={handleJoinExisting} className="join-existing-form">
          <div>
            <label className="form-label">Room ID</label>
            <input
              type="text"
              placeholder="Paste room ID here"
              value={roomInput}
              onChange={(e) => setRoomInput(e.target.value)}
              className="form-input"
            />
          </div>
          <button type="submit" className="button button-secondary">
            Join board
          </button>
        </form>
      </div>
    </div>
  );
}
