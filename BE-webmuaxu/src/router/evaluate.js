const express = require('express');
const router = express.Router();
const Evaluate = require('../models/evaluate');

router.post('/', async (req, res) => {
    try {
        const evaluate = new Evaluate(req.body);
        await evaluate.save();
        res.status(201).send(evaluate);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/:id', async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    try {
        const updatedEvaluate = await Evaluate.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedEvaluate) {
            return res.status(404).send({ message: 'Không tìm thấy đánh giá' });
        }
        req.io.emit('tradeUpdate', updatedEvaluate);
        res.send(updatedEvaluate);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedEvaluate = await Evaluate.findByIdAndDelete(id);
        if (!deletedEvaluate) {
            return res.status(404).send({ message: 'Không tìm thấy đánh giá' });
        }
        res.send({ message: 'Đã xóa đánh giá thành công' });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const evaluate = await Evaluate.find().skip((page - 1) * limit).limit(limit);
        res.status(200).send(evaluate);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;