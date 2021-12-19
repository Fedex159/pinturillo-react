const ObjectId = require("mongodb").ObjectId;
const { Room } = require("../models/Room");

async function getRooms(req, res, next) {
  try {
    if (req.query.id) {
      next();
      return;
    }
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

async function getUsersFromRoom(req, res, next) {
  try {
    const { id } = req.params;

    const result = await Room.findOne({ _id: new ObjectId(id) });

    res.json(result ? result.users : null);
  } catch (err) {
    next(err);
  }
}

async function createRoom(req, res, next) {
  try {
    const { title, password } = req.body;
    if (title) {
      const response = await Room.create({ title, password, users: [] });

      res.json({ message: response._id });
      return;
    }
    res.status(400).json({ message: "Title or password missed" });
  } catch (e) {
    next(e);
  }
}

async function verifyRoom(req, res, next) {
  try {
    const { id, password } = req.query;
    const result = await Room.findOne({
      _id: new ObjectId(id),
      password: password,
    });

    res.send({ message: result ? true : false });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getRooms,
  getRoomById,
  createRoom,
  verifyRoom,
  getUsersFromRoom,
};
