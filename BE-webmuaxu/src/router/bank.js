const express = require('express');
const router = express.Router();
const Bank = require('../models/bank');
const authMiddleware = require('../middlewares/authMiddleware');

// router.post('/', authMiddleware, async (req, res) => {
router.post('/', async (req, res) => {
    try {
        const bank = new Bank(req.body);
        await bank.save();
        res.status(201).send(bank);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/:id', async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    try {
        const updatedBank = await Bank.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedBank) {
            return res.status(404).send({ message: 'Không tìm thấy ngân hàng' });
        }
        res.send(updatedBank);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedBank = await Bank.findByIdAndDelete(id);
        if (!deletedBank) {
            return res.status(404).send({ message: 'Không tìm thấy ngân hàng' });
        }
        res.send({ message: 'Đã xóa ngân hàng thành công' });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const bank = await Bank.find();
        res.status(200).send(bank);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;