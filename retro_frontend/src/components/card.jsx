import { useBoard } from "../context/BoardContext";
import { Draggable } from "@hello-pangea/dnd";
import "../css/card.css";
import "../css/button.css";

const Card = ({ text, name, id, votes, index }) => {
  const { handleVoteShared, myVotes } = useBoard();

  const hasVoted = myVotes ? myVotes.includes(id) : false;

  return (
    <Draggable draggableId={String(id)} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="note-card" style={provided.draggableProps.style}>
          <p className="note-card-text">{text}</p>

          <div className="note-card-footer">
            <span>{name}</span>
            <button onClick={() => handleVoteShared(id)} className={`button button-vote ${hasVoted ? "button-vote-active" : ""}`}>
              <span>{hasVoted ? "❤️" : "🤍"}</span>
              <span className="vote-count">{votes}</span>
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
