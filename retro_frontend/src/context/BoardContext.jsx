/* eslint-disable */
import { useState, useEffect, useRef, useContext, createContext } from "react";
import { io } from "socket.io-client";

const BoardContext = createContext();

export default function BoardProvider({ children }) {
  const [notes, setNotes] = useState([]);
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

    return () => socketRef.current.disconnect();
  }, []);

  const newNoteHandle = (text, activeColumns) => {
    const newNote = {
      id: Date.now().toString(),
      column: activeColumns,
      text: text,
      votes: 0,
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
    socketRef.current.emit("client-vote-increase", cardId);
  };

  return (
    <BoardContext.Provider value={{ notes, handleVoteShared, newNoteHandle }}>
      {children}
    </BoardContext.Provider>
  );
}

export const useBoard = () => useContext(BoardContext);
