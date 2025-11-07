const mongoose = require('mongoose');
const subCategory = require('./sub_category');

const productSchema = mongoose.Schema({
    productName:{
        type:String,
        trim:true,
        require:true
    },
    productPrice:{
        type:Number,
        require:true
    },
    quantity:{
        type:Number,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    subCategory:{
        type:String,
        require:true
    },
    images:[
        {
            type:String,
            require:true
        }
    ],
    popular:{
        type:Boolean,
        default:false
    },
    recommend:{
        type:Boolean,
        default:false
    },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;