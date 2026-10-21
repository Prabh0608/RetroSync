import Form from "./noteForm";
import Card from "./card";
import { Droppable } from "@hello-pangea/dnd";
import { useState } from "react";
import { useBoard } from "../context/BoardContext";
import "../css/column.css";
import "../css/button.css";

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
    <div className="board-column">
      <div className="column-header">
        <h3>{title}</h3>
      </div>

      <button
        onClick={() => setActiveColumns(activeColumns === title ? "" : title)}
        className={`button button-add-item ${activeColumns === title ? "button-add-item-active" : ""}`}
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
          <div ref={provided.innerRef} {...provided.droppableProps} className="column-drop-area">
            {notes
              .filter(
                (note) => note.column === `${title}` && note.roomID === roomID,
              )
              .map((filteredNote, index) => (
                <Card
                  key={filteredNote.id}
                  index={index}
                  text={filteredNote.text}
                  name={filteredNote.author}
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
