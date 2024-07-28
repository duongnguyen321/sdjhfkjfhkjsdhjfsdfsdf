const mongoose = require("mongoose");
const Trade = require("./trade");

const coinSchema = new mongoose.Schema({
  name: String,
  unit: String,
  quantity: Number,
  icon: String,
  moneySell: Number,
  serviceChargeSell: Number,
  statusSell: Number,
  moneyBuy: Number,
  serviceChargeBuy: Number,
  statusBuy: Number,
  min: Number,
  walletAddress: String,
  qrCoin: String,
});

coinSchema.post("findOneAndUpdate", async function (doc) {
  if (doc) {
    const trades = await Trade.updateMany(
      { idCoin: doc._id.toString() },
      { name: doc.name }
    );
  }
});

module.exports = mongoose.model("Coin", coinSchema);
