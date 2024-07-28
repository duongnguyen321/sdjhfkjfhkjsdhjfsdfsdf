const express = require('express');
const router = express.Router();
const { secretKey } = require('../../config');
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/list', async (req, res) => {
    try {
        const admins = await Admin.find({}, '-password');
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.', error });
    }
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        let admin = await Admin.findOne({ username });
        if (admin) {
            return res.status(400).json({ message: 'Tên người dùng đã được sử dụng.' });
        }
        admin = new Admin({
            username,
            password: await bcrypt.hash(password, 10)
        });
        await admin.save();
        res.status(201).json({ message: 'Đăng ký thành công.' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.', error });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(400).json({ message: 'Tài khoản không tồn tại.' });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mật khẩu không chính xác.' });
        }
        const token = jwt.sign({ userId: admin._id }, secretKey, { expiresIn: '1d' });
        res.json({ userId: admin._id, username: admin.username, token });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.', error });
    }
});

module.exports = router;