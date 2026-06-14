import { useBoard } from "../context/BoardContext";

const Card = ({ text, name, id, votes }) => {
  const { handleVoteShared } = useBoard();
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "16px",
        marginBottom: "12px",
      }}
    >
      <p
        style={{
          margin: 0,
          marginBottom: "12px",
          color: "#111827",
        }}
      >
        {text}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "14px",
          color: "#6b7280",
        }}
      >
        <span>{name}</span>
        <butoon
          onClick={() => handleVoteShared(id)}
          style={{ cursor: "pointer" }}
        >
          ❤️ {votes}
        </butoon>
      </div>
    </div>
  );
};
export default Card;
