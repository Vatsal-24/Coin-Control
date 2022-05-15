const cmp = require("./cmp");
const Alert = require("./../models/alertModel");
const routes = require("./../routes/alertRoutes");
const sendEmail = require("./sendEmail");

const isAlertTriggered = async (alert, cmpobj) => {
  const type = alert.type;
  const currentPrice =
    alert.asset === "BTC" ? cmpobj.data.BTC : cmpobj.data.ETH;

  console.log(currentPrice, alert.asset, type, alert.price);
  if (type === "above") {
    console.log("inside above");
    if (currentPrice > alert.price) return true;
  } else if (type === "below") {
    console.log("inside below");
    if (currentPrice < alert.price) return true;
  }
  console.log("bug 1");
  return false;
};

const alertChecker = async () => {
  const allalerts = await Alert.find();
  const cmpobj = await cmp();
  allalerts.map(async (alert) => {
    const type = alert.type;
    const currentPrice =
      alert.asset === "BTC" ? cmpobj.data.BTC : cmpobj.data.ETH;

    console.log(currentPrice, alert.asset, type, alert.price);
    if (type === "above" && currentPrice > alert.price) {
      await sendEmail(
        `${alert.asset} has hit the alert price of ${alert.price} \n Price of ${alert.asset} is ${alert.type} ${alert.price}`
      );
      await Alert.findByIdAndDelete(alert._id);
    } else if (type === "below" && currentPrice < alert.price) {
      await sendEmail(
        `${alert.asset} has hit the alert price of ${alert.price} \n Price of ${alert.asset} is ${alert.type} ${alert.price}`
      );
      await Alert.findByIdAndDelete(alert._id);
    } else if (type === "equals" && currentPrice === alert.price) {
      await sendEmail(
        `${alert.asset} has hit the alert price of ${alert.price}`
      );
      await Alert.findByIdAndDelete(alert._id);
    }
  });
};

module.exports = alertChecker;
