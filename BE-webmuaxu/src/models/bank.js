const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
    name: String,
    icon: String,
    accountNumber: String,
    userName: String,
    bin: Number,
    status: Number,
    bankBalance: Number,
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

bankSchema.pre('findOneAndUpdate', async function(next) {
    const Bank = mongoose.model('Bank', bankSchema);

    // Lấy giá trị mới của bankBalance từ bản cập nhật
    const update = this.getUpdate();
    if (update.bankBalance !== undefined) {
        // Cập nhật bankBalance cho tất cả tài liệu
        await Bank.updateMany({}, { $set: { bankBalance: update.bankBalance } });
    }
    next();
});

bankSchema.pre('save', async function(next) {
    const Bank = mongoose.model('Bank', bankSchema);
    // Cập nhật bankBalance cho tất cả tài liệu
    await Bank.updateMany({}, { $set: { bankBalance: this.bankBalance } });
    next();
});

bankSchema.pre('save', function(next) {
    this.timeUpdate = Date.now();
    next();
});

bankSchema.pre('findOneAndUpdate', function(next) {
    this.set({ timeUpdate: Date.now() });
    next();
});

module.exports = mongoose.model('Bank', bankSchema);