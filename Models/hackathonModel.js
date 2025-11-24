const {Schema,model} = require('mongoose')
const mongoose = require("mongoose");

module.exports.hackathonModel = model('hackathonModel',Schema({
    name:{
        type:String
    },
    url:{
        type:String
    },
    date:{
        type:Date
    },
    context:{
        type:String
    },
    mode:{
        type:String
    }
},{timestamps:true}))