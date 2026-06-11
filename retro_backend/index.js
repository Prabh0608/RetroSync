const express = require("express");
const { Server } = require("socket.io");
const http = require("node:http");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("A new user has connected!");
});

server.listen("3000", () => {
  console.log("Your server is running on port 3000!");
});
