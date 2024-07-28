const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
    idCoin: String,
    nameCoin: String,
    unitCoin: String,
    quantity: Number,
    walletAddress: String,
    qrCoin: String,
    userName: String,
    idUser: String,
    accountNumber: String,
    bankName: String,
    binBank: Number,
    bankAccount: String,
    moneyTrade: Number,
    transactionFees: Number,
    oderStatus: Number,
    tradeStatus: Number,
    tradingCode: String,
    exchangeRate: String,
    timeCreate: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    timeUpdate: {
        type: Date,
        default: Date.now
    },
    timeEnd: {
        type: Date,
        immutable: true
    }
});

tradeSchema.pre('save', function(next) {
    this.timeUpdate = Date.now();
    next();
});

tradeSchema.pre('findOneAndUpdate', function(next) {
    this.set({ timeUpdate: Date.now() });
    next();
});

module.exports = mongoose.model('List', tradeSchema);