const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  asset: {
    type: String,
  },
  price: {
    type: Number,
  },
  email: {
    email: String,
  },
  type: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
});

const Alert = mongoose.model("Alert", alertSchema);
module.exports = Alert;
