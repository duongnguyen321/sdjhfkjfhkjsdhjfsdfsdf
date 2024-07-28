const express = require('express');
const tradeRoutes = require('./trades');
const coinRoutes = require('./coins');
const bankRoutes = require('./bank');
const userRoutes = require('./authRoutes');
const adminRoutes = require('./admin');
const imgRoutes = require('./img');
const webRoutes = require('./web');
const evaluateRoutes = require('./evaluate');
const transactionRoutes = require('./transaction');

const router = express.Router();

router.use('/trades', tradeRoutes);
router.use('/coins', coinRoutes);
router.use('/bank', bankRoutes);
router.use('/', userRoutes);
router.use('/admin', adminRoutes);
router.use('/img', imgRoutes);
router.use('/web', webRoutes);
router.use('/evaluate', evaluateRoutes);
router.use('/transaction', transactionRoutes);

module.exports = router;
