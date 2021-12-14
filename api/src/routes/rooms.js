const express = require("express");
const router = express.Router();
const { getRoomById } = require("../controllers/Rooms");

router.get("/:id", getRoomById);

module.exports = router;
