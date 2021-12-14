const { Router } = require("express");
const rooms = require("./rooms");

const router = Router();

router.use("/rooms", rooms);

module.exports = router;
