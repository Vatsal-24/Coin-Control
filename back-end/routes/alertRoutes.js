const express = require("express");
const alertController = require("./../controllers/alertController");

const router = express.Router();

router.route("/prices").get(alertController.CurrentPrice);
router
  .route("/")
  .get(alertController.GetAllAlerts)
  .post(alertController.CreateAlert);
router
  .route("/:id")
  .delete(alertController.DeleteAlert)
  .patch(alertController.EditAlert);
module.exports = router;
