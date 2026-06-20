const express = require("express");
const { Server } = require("socket.io");
const http = require("node:http");
const cors = require("cors");
const mongoose = require("mongoose");
const Note = require("./models/Note");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "config.env") });

const app = express();
app.use(cors({ origin: "https://retro-sync-olive.vercel.app/" }));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://retro-sync-olive.vercel.app/",
    methods: ["GET", "POST"],
  },
});

const activeUsers = {};
const getUsersInRoom = (roomID) => {
  return Object.values(activeUsers)
    .filter((user) => user.roomID === roomID)
    .map((user) => user.username);
};

mongoose
  .connect(
    `mongodb+srv://sainiprabhjot75_db_user:${process.env.DATABASE_PASS}@retrosync.ke395ef.mongodb.net/`,
  )
  .then(() => console.log("Your Databse is connected!"))
  .catch((err) => console.log(err));

io.on("connection", (socket) => {
  socket.on("join-room", async ({ roomID, username }) => {
    socket.join(roomID);
    activeUsers[socket.id] = { roomID, username };

    const roomUsers = getUsersInRoom(roomID);
    io.to(roomID).emit("room-users-updated", roomUsers);

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
    if (user) {
      const { roomID } = user;
      delete activeUsers[socket.id];

      const roomUsers = getUsersInRoom(roomID);
      io.to(roomID).emit("room-users-updated", roomUsers);
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Your server is running on port 3000!");
});
