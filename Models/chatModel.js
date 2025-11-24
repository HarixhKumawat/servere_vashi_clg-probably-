const {Schema,model} = require('mongoose')
const mongoose = require("mongoose");

module.exports.chatModel = model('chatModel',Schema({
    chatName:{
        type:String,
        trim:true
    },
    users:[{
        type:Schema.Types.ObjectId,
        ref: 'signupmodel'
    }],
    latestMessage:{
        type:Schema.Types.ObjectId,
        ref:"msgModel"
    },
    isGroupChat:{
        type:Boolean,
        require:true
    },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    desc:{
        type:String,

    },
    type:{
        type:String
    }
},{timestamps:true}))