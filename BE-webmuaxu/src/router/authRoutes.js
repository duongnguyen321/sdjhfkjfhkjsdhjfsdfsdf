const express = require('express');
const router = express.Router();
const axios = require('axios');
const { secretKey } = require('../../config');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({}, '-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.', error });
    }
});

// router.post('/register', async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         let user = await User.findOne({ username });
//         if (user) {
//             return res.status(400).json({ message: 'Tên người dùng đã được sử dụng.' });
//         }
//         user = new User({
//             username,
//             password: await bcrypt.hash(password, 10)
//         });
//         await user.save();
//         res.status(201).json({ message: 'Đăng ký thành công.' });
//     } catch (error) {
//         res.status(500).json({ message: 'Lỗi máy chủ.', error });
//     }
// });

router.post('/register', async (req, res) => {
    const { username, password, recaptchaToken } = req.body;
  
    // Kiểm tra các trường bắt buộc
    if (!username || !password || !recaptchaToken) {
      return res.status(400).json({ message: 'Thiếu thông tin đăng ký.' });
    }
  
    try {
      // Gửi yêu cầu xác minh đến Google reCAPTCHA API
      const secretKey = '6LfwFxoqAAAAAFJ3Grv2DfpPBLI9mnQp7Pt1okEt';
      const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
        params: {
          secret: secretKey,
          response: recaptchaToken
        }
      });
  
      const { success, score, 'error-codes': errorCodes } = response.data;
  
      // Kiểm tra kết quả xác minh reCAPTCHA
      if (!success || score < 0.5) {
        return res.status(400).json({ message: 'Xác minh reCAPTCHA thất bại.', errors: errorCodes });
      }
  
      // Kiểm tra xem tên người dùng đã tồn tại hay chưa
      let user = await User.findOne({ username });
      if (user) {
        return res.status(400).json({ message: 'Tên người dùng đã được sử dụng.' });
      }
  
      // Tạo người dùng mới và lưu vào cơ sở dữ liệu
      user = new User({
        username,
        password: await bcrypt.hash(password, 10)
      });
      await user.save();
      res.status(201).json({ message: 'Đăng ký thành công.' });
  
    } catch (error) {
      console.error('Lỗi máy chủ:', error);
      res.status(500).json({ message: 'Lỗi máy chủ.', error: error.message });
    }
  });

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Tài khoản không tồn tại.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mật khẩu không chính xác.' });
        }
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1d' });
        res.json({ userId: user._id, username: user.username, token });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.', error });
    }
});

module.exports = router;