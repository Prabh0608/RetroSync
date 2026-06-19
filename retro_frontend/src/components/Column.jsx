import Form from "./noteForm";
import Card from "./card";
import { Droppable } from "@hello-pangea/dnd";
import { useState } from "react";
import { useBoard } from "../context/BoardContext";

const Column = ({ title }) => {
  const [text, setText] = useState("");
  const [activeColumns, setActiveColumns] = useState();
  const { notes, newNoteHandle, roomID } = useBoard();

  const handleAddNote = (e) => {
    e.preventDefault();
    newNoteHandle(text, activeColumns);
    setActiveColumns("");
    setText("");
  };

  return (
    <div
      style={{
        background: "#f8fafc",
        padding: "16px",
        borderRadius: "12px",
        minHeight: "500px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
        }}
      >
        <h3>{title}</h3>
      </div>

      <button
        onClick={() => setActiveColumns(activeColumns === title ? "" : title)}
        style={{
          width: "100%",
          padding: "10px",
          margin: "10px 0",
          border: "1px dashed #cbd5e1",
          borderRadius: "8px",
          background: activeColumns === title ? "#f1f5f9" : "white",
          cursor: "pointer",
        }}
      >
        {activeColumns === title ? "✕ Close" : "+ Add New Item"}
      </button>

      {activeColumns === `${title}` && (
        <Form
          handleAddNote={handleAddNote}
          text={text}
          setText={setText}
          placeHolder={"What can we do?"}
        />
      )}

      <Droppable droppableId={title}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ flexGrow: 1, minHeight: "100px" }}
          >
            {notes
              .filter(
                (note) => note.column === `${title}` && note.roomID === roomID,
              )
              .map((filteredNote, index) => (
                <Card
                  key={filteredNote.id}
                  index={index}
                  text={filteredNote.text}
                  name={filteredNote.author || "anonymous"}
                  id={filteredNote.id}
                  votes={filteredNote.votes}
                />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
