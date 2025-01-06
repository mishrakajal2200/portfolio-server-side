const express = require("express");
const router = express.Router();
const { createMessage } = require("../controllers/messageController");

router.post("/contact", createMessage);

module.exports = router;
