// import express module
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const mongoose = require('mongoose');

// buat instance router
const authRouter = express.Router();

// signup endpoint
authRouter.post('/api/signup', async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        // pastikan gunakan model User untuk findOne
        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // simpan user baru
        let user = new User({ fullname, email, password: hashedPassword });
        await user.save();

        return res.status(200).json({ message: 'User created successfully' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// sign in endpoint
authRouter.post('/api/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        const findUser = await User.findOne({ email });
        if (!findUser) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, findUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ id: findUser._id }, "passkey");

        // sembunyikan password sebelum dikirim ke client
        const { password: _, ...userWithoutPassword } = findUser._doc;

        return res.status(200).json({
            message: "Sign in successful",
            token,
            user: userWithoutPassword
        });

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = authRouter;
