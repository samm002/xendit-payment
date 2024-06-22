const express = require("express");
const paymentController = require("./controller");

const router = express.Router();

router.get("/", paymentController.homePage);
router.post("/pay", paymentController.pay);

module.exports = router;