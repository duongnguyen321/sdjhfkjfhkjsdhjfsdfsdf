const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

router.post('/', async (req, res) => {
    try {
        const transaction = new Transaction(req.body);
        await transaction.save();
        res.status(201).send(transaction);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/:id', async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedTransaction) {
            return res.status(404).send({ message: 'Không tìm thấy giao dịch' });
        }
        res.send(updatedTransaction);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedTransaction = await Transaction.findByIdAndDelete(id);
        if (!deletedTransaction) {
            return res.status(404).send({ message: 'Không tìm thấy giao dịch' });
        }
        res.send({ message: 'Đã xóa giao dịch thành công' });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).send(transactions);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;