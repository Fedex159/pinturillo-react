const express = require("express");
const router = express.Router();
const { getRoomById, createRoom, getRooms } = require("../controllers/Rooms");

router.get("/", getRooms);
router.get("/:id", getRoomById);

router.post("/", createRoom);

module.exports = router;
