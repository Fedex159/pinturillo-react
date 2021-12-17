const ObjectId = require("mongodb").ObjectId;
const { Room } = require("../models/Room");

async function getRooms(req, res, next) {
  try {
    const result = await Room.find({}, { password: false, __v: false });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function getRoomById(req, res, next) {
  try {
    const { id } = req.params;

    const result = await Room.findOne({ _id: new ObjectId(id) });

    res.json(result);
  } catch (e) {
    next(e);
  }
}

async function createRoom(req, res, next) {
  try {
    const { title, password } = req.body;
    if (title && password) {
      const response = await Room.create({ title, password, users: [] });

      res.json({ message: response._id });
      return;
    }
    res.status(400).json({ message: "Title or password missed" });
  } catch (e) {
    next(e);
  }
}

module.exports = { getRooms, getRoomById, createRoom };
