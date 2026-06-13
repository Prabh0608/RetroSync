import Form from "./noteForm";
import Card from "./card";
import { useState } from "react";

const Column = ({ title, newNoteHandle, notes }) => {
  const [text, setText] = useState("");
  const [activeColumns, setActiveColumns] = useState();

  const handleAddNote = (e) => {
    e.preventDefault();
    newNoteHandle(text, activeColumns);
    setText("");
  };
  return (
    <div
      style={{
        background: "#f8fafc",
        padding: "16px",
        borderRadius: "12px",
      }}
    >
      <h3>{`${title}`}</h3>

      <button
        onClick={() => setActiveColumns(`${title}`)}
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

      {activeColumns === `${title}` && (
        <Form
          handleAddNote={handleAddNote}
          text={text}
          setText={setText}
          placeHolder={"What can we do?"}
        />
      )}

      {notes
        .filter((note) => note.column === `${title}`)
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
  );
};

export default Column;
