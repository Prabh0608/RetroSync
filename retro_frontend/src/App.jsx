import { io } from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import Column from "./components/Column";

function App() {
  const [notes, setNotes] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000");

    socketRef.current.on("server-note-added", (newNote) => {
      setNotes((prevNotes) => [...prevNotes, newNote]);
    });

    return () => socketRef.current.disconnect();
  }, []);

  const newNoteHandle = (text, activeColumns) => {
    const newNote = {
      id: Date.now().toString(),
      column: activeColumns,
      text: text,
      votes: 0,
    };
    setNotes([...notes, newNote]);
    socketRef.current.emit("client-add-note", newNote);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "16px",
        width: "100%",
      }}
    >
      <Column title="went-well" newNoteHandle={newNoteHandle} notes={notes} />
      <Column title="to-improve" newNoteHandle={newNoteHandle} notes={notes} />
      <Column
        title="action-items"
        newNoteHandle={newNoteHandle}
        notes={notes}
      />
    </div>
  );
}

export default App;
