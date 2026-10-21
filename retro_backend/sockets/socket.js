const Note = require("../models/Note");

const activeUsers = {};

const getUsersInRoom = (roomID) => {
  return Object.values(activeUsers)
    .filter((user) => user.roomID === roomID)
    .map((user) => user.username);
};

const socketHandlers = (io) => {
  io.on("connection", (socket) => {
    socket.on("join-room", async ({ roomID, username }) => {
      socket.join(roomID);
      activeUsers[socket.id] = { roomID, username };

      io.to(roomID).emit("room-users-updated", getUsersInRoom(roomID));

      try {
        const existingNotes = await Note.find({ roomID });
        socket.emit("initial-room-notes", existingNotes);
      } catch (err) {
        console.error("Error loading notes:", err);
      }
    });

    socket.on("client-add-note", async (newNote) => {
      try {
        await Note.create(newNote);
        socket.to(newNote.roomID).emit("server-note-added", newNote);
      } catch (err) {
        console.error(err);
      }
    });

    socket.on("client-move-note", async (cardId, newColumn, roomID) => {
      try {
        await Note.findOneAndUpdate({ id: cardId }, { column: newColumn });
        socket.to(roomID).emit("server-note-moved", cardId, newColumn);
      } catch (err) {
        console.error(err);
      }
    });

    socket.on("client-vote-increase", async (cardId, roomID) => {
      try {
        await Note.findOneAndUpdate({ id: cardId }, { $inc: { votes: 1 } });
        socket.to(roomID).emit("server-vote-increase", cardId);
      } catch (err) {
        console.error(err);
      }
    });

    socket.on("client-vote-decrease", async (cardId, roomID) => {
      try {
        await Note.findOneAndUpdate({ id: cardId }, { $inc: { votes: -1 } });
        socket.to(roomID).emit("server-vote-decrease", cardId);
      } catch (err) {
        console.error(err);
      }
    });

    socket.on("disconnect", () => {
      const user = activeUsers[socket.id];
      if (!user) return;

      delete activeUsers[socket.id];
      io.to(user.roomID).emit(
        "room-users-updated",
        getUsersInRoom(user.roomID),
      );
    });
  });
};

module.exports = { socketHandlers };
