const mongoose = require('mongoose');

const evaluateSchema = new mongoose.Schema({
    userName: String,
    idUser: String,
    comment: String,
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

evaluateSchema.pre('save', function(next) {
    this.timeUpdate = Date.now();
    next();
});

evaluateSchema.pre('findOneAndUpdate', function(next) {
    this.set({ timeUpdate: Date.now() });
    next();
});

module.exports = mongoose.model('Comment', evaluateSchema);