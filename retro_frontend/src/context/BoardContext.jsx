/* eslint-disable */
import { useState, useEffect, useRef, useContext, createContext } from "react";
import { io } from "socket.io-client";

export const BoardContext = createContext();

export default function BoardProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [roomID, setRoomID] = useState("");
  const [username, setUsername] = useState("anonymous");
  const [users, setUsers] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000");

    socketRef.current.on("server-note-added", (newNote) => {
      setNotes((prevNotes) => [...prevNotes, newNote]);
    });

    socketRef.current.on("server-vote-increase", (cardId) => {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === cardId ? { ...note, votes: note.votes + 1 } : note,
        ),
      );
    });

    socketRef.current.on("room-users-updated", (roomUsers) => {
      setUsers(roomUsers);
    });

    socketRef.current.on("server-note-moved", (arg1, arg2) => {
      const incomingCardId =
        arg1 && typeof arg1 === "object" ? arg1.cardId : arg1;
      const incomingColumn =
        arg1 && typeof arg1 === "object" ? arg1.newColumn || arg1.column : arg2;

      if (!incomingCardId || !incomingColumn) return;

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          String(note.id) === String(incomingCardId)
            ? { ...note, column: incomingColumn }
            : note,
        ),
      );
    });

    return () => socketRef.current.disconnect();
  }, []);

  const newNoteHandle = (text, activeColumns) => {
    const newNote = {
      id: Date.now().toString(),
      column: activeColumns,
      text: text,
      votes: 0,
      roomID: roomID,
    };
    setNotes([...notes, newNote]);
    socketRef.current.emit("client-add-note", newNote);
  };

  const handleVoteShared = (cardId) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === cardId ? { ...note, votes: note.votes + 1 } : note,
      ),
    );
    socketRef.current.emit("client-vote-increase", cardId, roomID);
  };

  const handleNewBoard = (generatedRoomId, passedUsername) => {
    const safeUsername =
      !passedUsername || passedUsername.trim() === ""
        ? "anonymous"
        : passedUsername;
    setRoomID(generatedRoomId);
    socketRef.current.emit("join-room", {
      roomID: generatedRoomId,
      username: safeUsername,
    });
  };

  const handleUsername = (text) => {
    const safeUsername = !text || text.trim() === "" ? "anonymous" : text;
    setUsername(safeUsername);
  };

  const handleResetRoom = () => {
    setRoomID("");
  };

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        String(note.id) === String(draggableId)
          ? { ...note, column: destination.droppableId }
          : note,
      ),
    );

    if (socketRef.current) {
      // 🌟 FIXED: Changed from emitting an object to flat positional parameters matching your backend's layout pattern
      socketRef.current.emit(
        "client-move-note",
        draggableId,
        destination.droppableId,
        roomID,
      );

      // Fallback: If your backend named this event after the server pattern, we emit this too
      socketRef.current.emit(
        "client-note-moved",
        draggableId,
        destination.droppableId,
        roomID,
      );
    }
  };

  return (
    <BoardContext.Provider
      value={{
        notes,
        roomID,
        username,
        handleVoteShared,
        newNoteHandle,
        handleNewBoard,
        handleUsername,
        handleResetRoom,
        handleDragEnd,
        users,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}

export const useBoard = () => useContext(BoardContext);
