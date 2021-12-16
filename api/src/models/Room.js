const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  password: {
    type: String,
  },
  users: [String],
});

const Room = mongoose.model("Room", RoomSchema);

module.exports = { Room };
