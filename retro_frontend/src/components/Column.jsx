import Form from "./noteForm";
import Card from "./card";
import { Droppable } from "@hello-pangea/dnd";
import { useState } from "react";
import { useBoard } from "../context/BoardContext";

const Column = ({ title }) => {
  const [text, setText] = useState("");
  const [activeColumns, setActiveColumns] = useState();
  const { notes, newNoteHandle, users } = useBoard();

  const handleAddNote = (e) => {
    e.preventDefault();
    newNoteHandle(text, title);
    setActiveColumns("");
    setText("");
  };

  return (
    <Droppable droppableId={title}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            background: "#f8fafc",
            padding: "16px",
            borderRadius: "12px",
            minHeight: "500px",
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

            <div style={{ display: "flex", alignItems: "center" }}>
              {users?.slice(0, 4).map((user, idx) => (
                <img
                  key={idx}
                  src={"/userAvatar.jpg"}
                  alt={user.username}
                  title={user.username}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    border: "2px solid white",
                    marginLeft: "-8px",
                    objectFit: "cover",
                  }}
                />
              ))}

              {users?.length > 4 && (
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: "#e2e8f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    marginLeft: "-8px",
                    border: "2px solid white",
                  }}
                >
                  +{users.length - 4}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => setActiveColumns(`${title}`)}
            style={{
              width: "100%",
              padding: "10px",
              margin: "10px 0",
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
            .map((filteredNote, index) => (
              <Card
                key={filteredNote.id}
                index={index}
                text={filteredNote.text}
                name="Prabhjot"
                id={filteredNote.id}
                votes={filteredNote.votes}
              />
            ))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
