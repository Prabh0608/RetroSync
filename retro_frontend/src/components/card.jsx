import { useBoard } from "../context/BoardContext";
import { Draggable } from "@hello-pangea/dnd";

const Card = ({ text, name, id, votes, index }) => {
  const { handleVoteShared, myVotes } = useBoard();

  const hasVoted = myVotes ? myVotes.includes(id) : false;

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
              style={{
                cursor: "pointer",
                background: "transparent",
                border: "1px solid #e5e7eb",
                borderRadius: "20px",
                padding: "4px 10px",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                transition: "all 0.2s ease",
                backgroundColor: hasVoted ? "#fff5f5" : "transparent",
                borderColor: hasVoted ? "#fca5a5" : "#e5e7eb",
              }}
            >
              <span>{hasVoted ? "❤️" : "🤍"}</span>
              <span
                style={{
                  fontWeight: "600",
                  color: hasVoted ? "#dc2626" : "#4b5563",
                }}
              >
                {votes}
              </span>
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
