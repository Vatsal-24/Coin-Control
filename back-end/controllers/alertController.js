const cmp = require("../utils/cmp");
// const errorObject = require("./config");
const Alert = require("../models/alertModel");

exports.CurrentPrice = async (req, res) => {
  try {
    let prices = await cmp();
    if (prices.error) return res.status(500).json(errorObject);
    return res.status(200).json({
      success: true,
      price_data: prices.data,
    });
  } catch (error) {
    return res.status(500).json(errorObject);
  }
};

exports.CreateAlert = async (req, res) => {
  try {
    const { asset, price, email, type } = req.body;

    if (!asset || !price || !email || !type)
      return res.status(400).json({
        error: true,
        message: "Please provide the required fields",
      });

    if (asset.toLowerCase() != "btc" && asset.toLowerCase() != "eth")
      return res.status(400).json({
        error: true,
        message: "You can set alerts for BTC and ETH only.",
      });
    const newAlert = await Alert.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        alerts: newAlert,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(errorObject);
  }
};

exports.GetAllAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find();
    res.status(200).json({
      status: "success",
      data: {
        alerts,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      data: {
        err,
      },
    });
  }
};

exports.EditAlert = async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(req.params.id, req.body);
    // if (!alert) {
    //   res.status(500).json({
    //     status: "fail",
    //   });
    // }
  } catch (err) {
    res.status(500).json({
      status: "fail",
    });
  }
};
exports.DeleteAlert = async (req, res) => {
  try {
    await Alert.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
    });
  }
};
