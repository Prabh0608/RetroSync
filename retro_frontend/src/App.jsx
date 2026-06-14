import Column from "./components/Column";
import BoardProvider from "./context/BoardContext";

function App() {
  return (
    <BoardProvider>
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
    </BoardProvider>
  );
}

export default App;
