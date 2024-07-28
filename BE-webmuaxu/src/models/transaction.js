const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userName: String,
    content: String,
    feedback: String,
    time: String,
    timeCreate: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    timeUpdate: {
        type: Date,
        default: Date.now
    }
});

transactionSchema.pre('save', function(next) {
    this.timeUpdate = Date.now();
    next();
});

transactionSchema.pre('findOneAndUpdate', function(next) {
    this.set({ timeUpdate: Date.now() });
    next();
});

module.exports = mongoose.model('Transactions', transactionSchema);