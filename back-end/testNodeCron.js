var nodeCron = require("node-cron");
const alerts = require("./controller");
const Alert = require("./alertModel");
const { forEach } = require("./alert");
const cmp = require("./utils/cmp");

// var removeExpired = new CronJob("/10 * * * * * *", async function () {
//   await console.log("hello");
//   alerts.forEach((alert, index) => {
//     if (new Date(alert.createdAt).getTime() + 5 * 1000 < new Date().getTime())
//       alerts.splice(index, 1);
//   });
// });

const isAlertAcrive = (alert) => {
  const type = alert.type;
  const cmpobj = cmp();
  const currentPrice = alert.asset == "BTC" ? cmpobj[0] : cmpobj[1];

  if (type == "above") {
    if (alert.price > currentPrice) return true;
  } else {
    if (alert.price < currentPrice) return true;
  }
  return false;
};

const checkFor = async () => {
  console.log("World");
  const allalerts = await Alert.find();
  console.log("!");
  console.log(allalerts);
  allalerts.map((alert) => {
    if (!isAlertAcrive(alert)) {
      sendEmail();
      const alert = await Alert.findByIdAndDelete(alert._id);
    }
  });
};
nodeCron.schedule("*/10 * * * * *", () => {
  checkFor();
});
