import { io } from "socket.io-client";
import { useEffect } from "react";
import Column from "./components/Column";

function App() {
  useEffect(() => {
    const socket = io("http://localhost:3000");

    return () => socket.disconnect();
  }, []);

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

export default App;
