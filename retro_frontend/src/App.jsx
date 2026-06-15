import Column from "./components/Column";
import BoardProvider from "./context/BoardContext";
import JoiningScreen from "./components/JoinScreen";
import { useBoard } from "./context/BoardContext";

function BoardContent() {
  const { roomID } = useBoard();
  if (!roomID) {
    return <JoiningScreen />;
  }
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "16px",
        width: "100%",
      }}
    >
      <Column title="went-well" />
      <Column title="to-improve" />
      <Column title="action-items" />
    </div>
  );
}

function App() {
  return (
    <BoardProvider>
      <BoardContent />
    </BoardProvider>
  );
}

export default App;
