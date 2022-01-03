const io = require("socket.io");
const ObjectId = require("mongodb").ObjectId;
const { Room } = require("../models/Room");
const { User } = require("../models/User");

function drawing(socket) {
  socket.on("startDrawing", (coordinates, userWidth, userHeight, room) => {
    socket.broadcast
      .to(room)
      .emit("startDrawing", coordinates, userWidth, userHeight);
  });

  socket.on("drawing", (coordinates, userWidth, userHeight, room) => {
    socket.broadcast
      .to(room)
      .emit("drawing", coordinates, userWidth, userHeight);
  });

  socket.on("notDrawing", (room) => {
    socket.broadcast.to(room).emit("notDrawing");
  });

  socket.on("draw dot", (coordinates, width, height, room) => {
    socket.broadcast.to(room).emit("draw dot", coordinates, width, height);
  });

  socket.on("clear page", (room) => {
    socket.broadcast.to(room).emit("clear page");
  });

  socket.on("brush color", (color, room) => {
    socket.broadcast.to(room).emit("brush color", color);
  });

  socket.on("brush size", (size, room) => {
    socket.broadcast.to(room).emit("brush size", size);
  });
}

function userConnected(socket) {
  console.log("User connected: ", socket.id);

  socket.on("room", (roomId, name) => {
    User.create({ _id: socket.id, room: roomId, name: name })
      .then((user) => {
        console.log("User added to DB");
        return user;
      })
      .then((user) => {
        Room.findOneAndUpdate(
          { _id: new ObjectId(roomId) },
          { $push: { users: user } },
          { new: true }
        )
          .then(() => {
            socket.join(roomId);
            console.log("Join to room: ", roomId);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });

  socket.on("user connected", (userId, roomId, name) => {
    socket.broadcast.to(roomId).emit("user connected", {
      _id: userId,
      room: roomId,
      name: name,
      points: 0,
    });
  });
}

function userDisconnected(socket) {
  socket.on("disconnect", () => {
    console.log("User disconnect: ", socket.id);

    // Busco el usuario
    User.findOne({ _id: socket.id }).then((user) => {
      if (user) {
        socket.broadcast.to(user.room).emit("user disconnected", socket.id);

        // Busco la room y lo remuevo de la sala
        Room.findOneAndUpdate(
          { _id: new ObjectId(user.room) },
          { $pull: { users: { _id: user._id } } },
          { new: true }
        )
          .then((data) => {
            console.log("User removed from room");
            // room quedo vacia
            if (data && !data.users.length) {
              // Borramos la room de la db
              Room.deleteOne({ _id: data._id }).then(() =>
                console.log("Room delete from DB")
              );
            }
          })
          .then(() => {
            // Borramos el user de la db
            User.deleteOne({ _id: socket.id }).then(() =>
              console.log("User remove from DB")
            );
          })
          .catch((err) => console.log("Error: ", err));
      }
    });
  });
}

function chatMessages(socket) {
  socket.on("message send", (name, text, room, userId) => {
    socket.broadcast.to(room).emit("message incoming", name, text, userId);
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

    socket.on("word", (word, room) => {
      socket.broadcast.to(room).emit("word", word);
    });

    socket.on("counter", (counter, roomId) => {
      socket.broadcast.to(roomId).emit("counter", counter);
    });

    socket.on("subscribe to turn", (roomId) => {
      Room.findOne({ _id: new ObjectId(roomId) })
        .then((data) => {
          // turn no asignado
          // unico usuario en la room
          if (!data.turn && data.users.length === 1) {
            data.turn = socket.id;
            data.save();
          }

          if (!socket.myTimer) {
            socket.myTimer = setInterval(() => {
              console.log("Emitiendo...");
              socketIO.to(roomId).emit("subscribe to turn", data.turn);
            }, 1000);
          }
        })
        .catch((err) => console.log(err));
    });

    socket.on("turn end", (room) => {
      Room.findOne({ _id: new ObjectId(room) }).then((data) => {
        data.turn = data.users[1]._id;
        data.save().then(() => {
          console.log("New turn!!!");
          socket.emit("subscribe to turn", data.turn);
        });
      });
    });

    socket.on("unsubscribed to turn", () => {
      clearInterval(socket.myTimer);
      delete socket.myTimer;
      console.log("Unsubscribed to turn!!!");
    });

    socket.on("disconnect", () => {
      if (socket.myTimer) {
        clearInterval(socket.myTimer);
        delete socket.myTimer;
        console.log("Socket timer delete!!!");
      }
    });
  });
}

module.exports = { socket };
