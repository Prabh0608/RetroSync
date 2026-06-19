const express = require("express");
const { Server } = require("socket.io");
const http = require("node:http");
const cors = require("cors");
const mongoose = require("mongoose");
const Note = require("./models/Note");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "config.env") });

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
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
  console.log("A new user has connected!");

  socket.on("join-room", ({ roomID, username }) => {
    activeUsers[socket.id] = { username, roomID };
    socket.join(roomID);
    const roomUsers = getUsersInRoom(roomID);
    io.to(roomID).emit("room-users-updated", roomUsers);
    console.log(`${username} joined room: ${roomID}`);
  });

  socket.on("client-add-note", (newNote) => {
    socket.to(newNote.roomID).emit("server-note-added", newNote);
  });

  socket.on("client-vote-increase", (cardID, roomID) => {
    socket.to(roomID).emit("server-vote-increase", cardID);
  });

  socket.on("client-move-note", (cardId, newColumn, roomId) => {
    socket.to(roomId).emit("server-note-moved", { cardId, newColumn });
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

server.listen("3000", () => {
  console.log("Your server is running on port 3000!");
});
