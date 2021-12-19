const express = require("express");
const router = express.Router();
const {
  getRoomById,
  createRoom,
  getRooms,
  verifyRoom,
} = require("../controllers/Rooms");

router.get("/", getRooms);
router.get("/", verifyRoom);
router.get("/:id", getRoomById);

router.post("/", createRoom);

module.exports = router;
