const express = require('express');
const SubCategory = require('../models/sub_category');
const subcategoryRouter = express.Router();

subcategoryRouter.post('/api/subcategories', async (req, res) =>{
    try {
        const {categoryId, categoryName, image, subCategoryName} = req.body;
        const subCategory = new SubCategory({categoryId, categoryName, image, subCategoryName});
        await subCategory.save();
        return res.status(201).send(subCategory);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
});

subcategoryRouter.get('/api/category/:categoryName/subcategories', async (req, res) => {
    try {
        //extract the category name from the request URL using destructuring
    const {categoryName} = req.params;
    const subcategories = await SubCategory.find({categoryName:categoryName});

    //check jika ada 
    if (!subcategories || subcategories.length == 0) {
        //jika tidak di temukan , maka kirim respons code 404 error
        return res.status(404).json({message:"subcategories not found"});
    } else {
        return res.status(200).json({subcategories});
    }
    } catch (e) {
        res.status(500).json({error: e.message});
    }
});

module.exports = subcategoryRouter;