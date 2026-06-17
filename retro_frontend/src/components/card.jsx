import { useBoard } from "../context/BoardContext";
import { Draggable } from "@hello-pangea/dnd";

// 1. Double check that 'index' is sitting inside these curly braces!
const Card = ({ text, name, id, votes, index }) => {
  const { handleVoteShared } = useBoard();

  return (
    // 2. Make sure Draggable consumes it right here
    <Draggable draggableId={String(id)} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps} // 👈 3. This spreads the click-and-hold handle logic!
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "16px",
            marginBottom: "12px",
            ...provided.draggableProps.style, // 👈 4. Merges layout animation CSS
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
