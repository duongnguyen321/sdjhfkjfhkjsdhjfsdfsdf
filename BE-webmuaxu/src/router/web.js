const express = require('express');
const router = express.Router();
const Web = require('../models/web');

router.post('/', async (req, res) => {
    try {
        const web = new Web(req.body);
        await web.save();
        res.status(201).send(web);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/:id', async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    try {
        const updatedCoin = await Web.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedCoin) {
            return res.status(404).send({ message: 'Không tìm thấy giao dịch' });
        }
        req.io.emit('tradeUpdate', updatedCoin);
        res.send(updatedCoin);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedCoin = await Web.findByIdAndDelete(id);
        if (!deletedCoin) {
            return res.status(404).send({ message: 'Không tìm thấy giao dịch' });
        }
        res.send({ message: 'Đã xóa giao dịch thành công' });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const web = await Web.find();
        res.status(200).send(web);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;