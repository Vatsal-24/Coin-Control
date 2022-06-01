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

app.listen(PORT, () => console.log("Server started listening!"));
