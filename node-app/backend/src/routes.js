const express = require("express");
const paymentController = require("./controller");

const router = express.Router();

router.post("/pay", paymentController.pay);

module.exports = router;