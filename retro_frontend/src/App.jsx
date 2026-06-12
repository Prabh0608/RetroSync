/* eslint-disable */
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import Card from "./components/card";

function App() {
  const [notes, setNotes] = useState([
    {
      id: "1",
      column: "went-well",
      text: "Our team communication was great this week!",
      votes: 0,
    },
    {
      id: "2",
      column: "to-improve",
      text: "Daily standups are running a bit too long.",
      votes: 2,
    },
    {
      id: "3",
      column: "action-items",
      text: "Cap standups at exactly 15 minutes.",
      votes: 1,
    },
  ]);

  useEffect(() => {
    const socket = io("http://localhost:3000");

    return () => socket.disconnect();
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "16px",
        width: "100%",
      }}
    >
      <div
        style={{
          background: "#f8fafc",
          padding: "16px",
          borderRadius: "12px",
        }}
      >
        <h3>Went Well</h3>

        <button
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px",
            border: "1px dashed #cbd5e1",
            borderRadius: "8px",
            background: "white",
            cursor: "pointer",
          }}
        >
          + Add New Item
        </button>

        {notes
          .filter((note) => note.column === "went-well")
          .map((filteredNote) => {
            return (
              <Card
                text={filteredNote.text}
                name="Prabhjot"
                likes={filteredNote.votes}
              />
            );
          })}
      </div>

      <div
        style={{
          background: "#f8fafc",
          padding: "16px",
          borderRadius: "12px",
        }}
      >
        <h3>To Improve</h3>

        <button
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px",
            border: "1px dashed #cbd5e1",
            borderRadius: "8px",
            background: "white",
            cursor: "pointer",
          }}
        >
          + Add New Item
        </button>

        {notes
          .filter((note) => note.column === "to-improve")
          .map((filteredNote) => {
            return (
              <Card
                text={filteredNote.text}
                name="Prabhjot"
                likes={filteredNote.votes}
              />
            );
          })}
      </div>

      <div
        style={{
          background: "#f8fafc",
          padding: "16px",
          borderRadius: "12px",
        }}
      >
        <h3>Action Items</h3>

        <button
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px",
            border: "1px dashed #cbd5e1",
            borderRadius: "8px",
            background: "white",
            cursor: "pointer",
          }}
        >
          + Add New Item
        </button>

        {notes
          .filter((note) => note.column === "action-items")
          .map((filteredNote) => {
            return (
              <Card
                text={filteredNote.text}
                name="Prabhjot"
                likes={filteredNote.votes}
              />
            );
          })}
      </div>
    </div>
  );
}

export default App;
