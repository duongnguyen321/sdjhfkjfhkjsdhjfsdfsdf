const express = require('express');
const router = express.Router();
const List = require('../models/trade');
const Web = require('../models/web');
const cron = require('node-cron');

router.post('/', async (req, res) => {
    try {
        const trade = new List(req.body);
        const web = await Web.findOne().sort({ _id: 1 }).exec(); // Get the first web document
        if (!web) {
            return res.status(404).send({ message: 'Web not found' });
        }
        const abbreviationName = web.abbreviationName;
        trade.tradingCode = await generateUniqueTradingCode(abbreviationName);
        trade.timeEnd = new Date(Date.now() + 10 * 60 * 1000);
        await trade.save();
        setTimeout(async () => {
            try {
                if(trade.tradeStatus === 3) {
                    trade.tradeStatus = 2;
                    trade.timeUpdate = Date.now();
                    const updatedTrade = await trade.save();
                    req.io.emit('tradeUpdate', updatedTrade);
                }
            } catch (updateError) {
                console.error('Error updating tradeStatus:', updateError);
            }
        }, 600000);
        res.status(201).send(trade);
    } catch (error) {
        res.status(400).send(error);
    }
});

async function generateUniqueTradingCode(abbreviationName) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const codeLength = 8;
    let tradingCode = '';
    let isUnique = false;
    while (!isUnique) {
        tradingCode = abbreviationName + ' '; // Start with abbreviationName
        for (let i = 0; i < codeLength; i++) {
            tradingCode += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        const existingTrade = await List.findOne({ tradingCode: tradingCode });
        if (!existingTrade) {
            isUnique = true;
        }
    }
    return tradingCode;
}

router.post('/:id', async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    try {
        const updatedTrade = await List.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedTrade) {
            return res.status(404).send({ message: 'Không tìm thấy giao dịch' });
        }
        req.io.emit('tradeUpdate', updatedTrade);
        res.send(updatedTrade);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedTrade = await List.findByIdAndDelete(id);
        if (!deletedTrade) {
            return res.status(404).send({ message: 'Không tìm thấy giao dịch' });
        }
        res.send({ message: 'Đã xóa giao dịch thành công' });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async (req, res) => {
    const { id, tradingCode, idUser, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    try {
        let data;

        if (id) {
            data = await List.findById(id);
            if (!data) return res.status(404).send({ message: 'Document not found' });
        } else if (tradingCode) {
            data = await List.findOne({ tradingCode });
            if (!data) return res.status(404).send({ message: 'Trading code not found' });
        } else if (idUser) {
            const total = await List.countDocuments({ idUser });
            data = await List.find({ idUser }).sort({ timeCreate: -1 }).skip(skip).limit(limit);
            return res.status(200).send({ total, data });
        } else {
            const total = await List.countDocuments();
            data = await List.find().sort({ timeCreate: -1 }).skip(skip).limit(limit);
            return res.status(200).send({ total, data });
        }

        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;