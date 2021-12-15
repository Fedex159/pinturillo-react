const io = require("socket.io");
const mongoose = require("mongoose");

function drawing(socket) {
  socket.on("startDrawing", (coordinates, userWidth, userHeight) => {
    socket.broadcast.emit("startDrawing", coordinates, userWidth, userHeight);
  });

  socket.on("drawing", (coordinates, userWidth, userHeight) => {
    socket.broadcast.emit("drawing", coordinates, userWidth, userHeight);
  });

  socket.on("notDrawing", () => {
    socket.broadcast.emit("notDrawing");
  });

  socket.on("draw dot", (coordinates, width, height) => {
    socket.broadcast.emit("draw dot", coordinates, width, height);
  });

  socket.on("clear page", () => {
    socket.broadcast.emit("clear page");
  });

  socket.on("brush color", (color) => {
    socket.broadcast.emit("brush color", color);
  });

  socket.on("brush size", (size) => {
    socket.broadcast.emit("brush size", size);
  });
}

function userConnected(socket) {
  console.log("User connected: ", socket.id);
  mongoose.connection.db
    .collection("rooms")
    .findOneAndUpdate({}, { $push: { users: socket.id } });

  socket.broadcast.emit("user connected", socket.id);
}

function userDisconnected(socket) {
  socket.on("disconnect", () => {
    console.log("User disconnect: ", socket.id);
    mongoose.connection.db
      .collection("rooms")
      .findOneAndUpdate({}, { $pull: { users: socket.id } });

    socket.broadcast.emit("user disconnected", socket.id);
  });
}

function chatMessages(socket) {
  socket.on("message send", (id, text) => {
    socket.broadcast.emit("message incoming", id, text);
  });
}

function socket(server) {
  const socketIO = io(server, {
    cors: {
      origin: "http://localhost:3000", //habilita al front que se conecte
      methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
      credentials: "true",
    },
  });

  socketIO.on("connection", (socket) => {
    // user connect
    userConnected(socket);

    // drawing
    drawing(socket);

    // chat
    chatMessages(socket);

    // user disconnect
    userDisconnected(socket);
  });
}

module.exports = { socket };
