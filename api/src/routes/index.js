const { Router } = require("express");
const rooms = require("./rooms");
const words = require("./words");
const router = Router();

router.use("/rooms", rooms);
router.use("/words", words);

module.exports = router;
