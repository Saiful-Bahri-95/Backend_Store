const express = require('express');
const Category = require('../models/category');

const categoryRouter = express.Router();

categoryRouter.post('/api/category', async (req, res) =>{
    try {
        const {image} = req.body;
        const banner = new Banner({image});
        await banner.save();
        return res.status(201).send(banner);
    } catch (e) {
        res.status(400).json({error:e.message});
    }
});

categoryRouter.get('/api/category', async (req, res) => {
    try {
        const banners = await Banner.find();
        return res.status(200).send(banners);
    } catch (e) {
        res.status(500).json({error:e.message});
    }
});

module.exports = bannerRouter;