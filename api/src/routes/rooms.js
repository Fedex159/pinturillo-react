const express = require("express");
const router = express.Router();
const { getRoomById, createRoom } = require("../controllers/Rooms");

router.get("/:id", getRoomById);

router.post("/", createRoom);

module.exports = router;
