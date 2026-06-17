import { useBoard } from "../context/BoardContext";
import { Draggable } from "@hello-pangea/dnd";

const Card = ({ text, name, id, votes, index }) => {
  const { handleVoteShared } = useBoard();

  return (
    <Draggable draggableId={String(id)} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "16px",
            marginBottom: "12px",
            ...provided.draggableProps.style,
          }}
        >
          <p style={{ margin: 0, marginBottom: "12px", color: "#111827" }}>
            {text}
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{name}</span>
            <button
              onClick={() => handleVoteShared(id)}
              style={{ cursor: "pointer" }}
            >
              ❤️ {votes}
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
