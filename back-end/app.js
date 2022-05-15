const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
var nodeCron = require("node-cron");
const cors = require("cors");
const html_to_pdf = require("html-pdf-node");
const fs = require("fs");
const alertChecker = require("./utils/alertChecker");
const alertRouter = require("./routes/alertRoutes");
const cmpRouter = require("./routes/cmpRoutes");
const userRouter = require("./routes/userRoutes");
const sendMail = require("./utils/sendEmail");
const mailContentUtil = require("./mailContentUtil");
const sh = require("shorthash");
var pdf = require("html-pdf");

dotenv.config({ path: "./config.env" });
const app = express();
app.use(cors({ credentials: true }));

app.use(express.static(`${__dirname}`));
app.use(express.json());

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then((con) => {
  console.log("DB connection successful");
});
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  return res.json({ status: "Up and running" });
});

app.use("/api/v1/cmp", cmpRouter);
app.use("/api/v1/alerts", alertRouter);
app.use("/api/v1/user", userRouter);

nodeCron.schedule("*/1000 * * * * *", () => {
  console.log("Hello");
  alertChecker();
});

let secondArray = [
  { name: "product 1", qty: "2", amount: 2000 },
  { name: "product 1", qty: "2", amount: 2000 },
  { name: "product 1", qty: "2", amount: 4000 },
];

const cont1 =
  mailContentUtil.header +
  `
        <p style="font-size: 32px; font-weight: 500;color: #3C3C3C;">Dear Admin, a new orrder has been placed by {user} to {sellername}</p>` +
  mailContentUtil.order1 +
  `<p style=" float:left;">Order ${"{order.id}"}</p>
  <p style=" float:right;">Order ${"{order.date}"}</p>` +
  mailContentUtil.order2 +
  secondArray.map(
    (
      ele
    ) => `<div style="display:flex;align-items: stretch;background-color:white">
<div style="flex-grow: 1; font-family:'Poppins', sans-serif; font-size:18px;font-weight:400">${
      ele.amount
    }</div>
<div style="flex-grow: 1; text-align:left;font-family:'Poppins', sans-serif; font-size:18px;font-weight:400"><p>${
      ele.name
    }</p><p>Seller: ${"ele.sellerName"}</p></div>
<div style="flex-grow: 1; font-family:'Poppins', sans-serif; font-size:18px;font-weight:400">Qty: ${
      ele.qty
    }</div>
<div style="flex-grow: 1; font-family:'Poppins', sans-serif; font-size:18px;font-weight:400">Rs. ${
      ele.amount
    }</div>
</div><hr/>`
  ) +
  mailContentUtil.footer1 +
  `              <p>Rs ${"{order.total}"}</p>
  <p>Rs ${"{order.deliveryCharge}"}</p>` +
  mailContentUtil.footer2;

var options = { format: "A3" };

// pdf.create(cont1, options).toFile("./abc.pdf", function (err, res) {
//   if (err) return console.log(err);
//   console.log(res);
// });

console.log(sh.unique("vatsal"));

app.listen(PORT, () => console.log("Server started listening!"));
