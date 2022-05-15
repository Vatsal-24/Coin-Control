const express = require("express");
const alertController = require("../controllers/alertController");
const router = express.Router();

router.route("/").get(alertController.CurrentPrice);
module.exports = router;
