const mongoose = require("mongoose");
const { Room } = require("./models/Room");

mongoose.connect("mongodb://localhost:27017/pinturillo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

function db() {
  Room(mongoose);
  connection.once("open", () => {
    console.log("Connection to DB!!!");
  });

  connection.on("error", (e) => {
    console.log("Connection to Db failed!!!", e);
  });
}

module.exports = { db };
