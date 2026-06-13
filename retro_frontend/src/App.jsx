import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import Column from "./components/Column";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:3000");

    return () => socket.disconnect();
  }, []);

  const newNoteHandle = (text, activeColumns) => {
    const newNote = {
      id: Date.now().toString(),
      column: activeColumns,
      text: text,
      votes: 0,
    };
    console.log(newNote);
    setNotes([...notes, newNote]);
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
