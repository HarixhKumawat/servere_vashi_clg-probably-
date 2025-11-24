const {Schema,model} = require('mongoose')
const mongoose = require("mongoose");

module.exports.cartModel = model('cartModel',Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"signupmodel",
        required:true
    },
    product:[{
        pName:{
            type:Schema.Types.ObjectId,
            ref:"productmodel",
            required:true
        },
        pCount:{
            type:String,
            required:true
        }
        
    }]
}))
