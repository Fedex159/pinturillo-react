const express = require("express");
const router = express.Router();
const { getWords } = require("../controllers/Words");

router.get("/", getWords);

module.exports = router;
