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

module.exports = { getRoomById };
