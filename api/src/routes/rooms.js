const express = require("express");
const router = express.Router();
const {
  getRoomById,
  createRoom,
  getRooms,
  verifyRoom,
} = require("../controllers/Rooms");

router.get("/", getRooms);
router.get("/:id", getRoomById);
router.get("/:id/:password", verifyRoom);

router.post("/", createRoom);

module.exports = router;
