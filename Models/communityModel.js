const {Schema,model} = require('mongoose')
const mongoose = require("mongoose");

module.exports.communityModel = model('communityModel',Schema({
    name:{
        type:String,
        required:true
    },
    genralChat:{
        type:Schema.Types.ObjectId,
        ref: 'chatModel'
    },
    users:[{
        type:Schema.Types.ObjectId,
        ref: 'signupmodel'
    }],
    hackathonBroadcasting:[{
        type:Schema.Types.ObjectId,
        ref:"hackathonModel"
    }],
    pols:[{
        type:Schema.Types.ObjectId,
        ref: 'polsModel'
    }],
    introduction:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    }
},{timestamps:true}))