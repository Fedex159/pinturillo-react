const express = require("express");
const router = express.Router();
const {
  getRoomById,
  createRoom,
  getRooms,
  verifyRoom,
  getUsersFromRoom,
} = require("../controllers/Rooms");

router.get("/", getRooms);
router.get("/", verifyRoom);
router.get("/:id", getRoomById);
router.get("/users/:id", getUsersFromRoom);

router.post("/", createRoom);

module.exports = router;
