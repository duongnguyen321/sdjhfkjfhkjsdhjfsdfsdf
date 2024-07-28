const mongoose = require('mongoose');

const socialNetworkSchema = new mongoose.Schema({
    name: String,
    url: String,
    logo: String
});

const questionSchema = new mongoose.Schema({
    title: String,
    content: String
});

const webSchema = new mongoose.Schema({
    nameWeb: String,
    abbreviationName: String,
    logo: String,
    email: String,
    phone: String,
    copyRight: String,
    noteFooter: String,
    linkSupportTele: String,
    socialNetwork: [socialNetworkSchema],
    tradeNote: String,
    findNote: String,
    qandaList: [questionSchema],
    imgDialogShow: String,
    contentDialogShow: String,
    favicon: String,
    titleWeb: String
});

module.exports = mongoose.model('Web', webSchema);