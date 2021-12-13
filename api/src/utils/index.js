const io = require("socket.io");

function socket(server) {
  const socketIO = io(server, {
    cors: {
      origin: "http://localhost:3000", //habilita al front que se conecte
      methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
      credentials: "true",
    },
  });

  socketIO.on("connection", (socket) => {
    console.log("User connected: ", socket.id);

    socket.on("startDrawing", (coordinates, userWidth, userHeight) => {
      socket.broadcast.emit("startDrawing", coordinates, userWidth, userHeight);
    });

    socket.on("drawing", (coordinates, userWidth, userHeight) => {
      socket.broadcast.emit("drawing", coordinates, userWidth, userHeight);
    });

    socket.on("notDrawing", () => {
      socket.broadcast.emit("notDrawing");
    });

    socket.on("disconnect", () => {
      console.log("User disconnect: ", socket.id);
    });
  });
}

module.exports = { socket };
