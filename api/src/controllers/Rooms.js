const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectId;

async function getRoomById(req, res, next) {
  try {
    const { id } = req.params;

    const result = await mongoose.connection.db
      .collection("rooms")
      .findOne({ _id: new ObjectId(id) });

    res.json(result);
  } catch (e) {
    next(e);
  }
}

async function createRoom(req, res, next) {
  try {
    const { title, password } = req.body;
    if (title && password) {
      const response = await mongoose.connection.db
        .collection("rooms")
        .insertOne({ title, password, users: [] });

      res.json({ message: response.insertedId });
      return;
    }
    res.status(400).json({ message: "Title or password missed" });
  } catch (e) {
    next(e);
  }
}

module.exports = { getRoomById, createRoom };
