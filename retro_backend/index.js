const express = require("express");
const { Server } = require("socket.io");
const http = require("node:http");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const { socketHandlers } = require("./sockets/socket");
require("dotenv").config({ path: path.resolve(__dirname, "config.env") });

const app = express();
const isProduction = process.env.NODE_ENV === "production";
const clientOrigin = isProduction
  ? "https://retro-sync-olive.vercel.app"
  : "http://localhost:5173";

app.use(cors({ origin: clientOrigin }));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: clientOrigin,
    methods: ["GET", "POST"],
  },
});

mongoose
  .connect(
    `mongodb+srv://sainiprabhjot75_db_user:${process.env.DATABASE_PASS}@retrosync.ke395ef.mongodb.net/`,
  )
  .then(() => console.log("Your Databse is connected!"))
  .catch((err) => console.log(err));

socketHandlers(io);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Your ${isProduction ? "production" : "local"} server is running on port ${PORT}!`);
});
