const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config({ path: "./../config.env" });

module.exports = async () => {
  try {
    const url = process.env.CRYPTO_API.replace("<KEY>", process.env.API_KEY);
    const resp = await axios.get(url);
    return {
      error: false,
      data: { BTC: resp.data[0].price, ETH: resp.data[1].price },
    };
  } catch (error) {
    return { error: true };
  }
};
