const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  password: {
    type: String,
  },
  users: [{ _id: String, room: String, name: String, points: Number }],
});

const Room = mongoose.model("Room", RoomSchema);

module.exports = { Room };
