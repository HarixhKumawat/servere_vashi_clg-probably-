const {Schema,model} = require('mongoose')
const mongoose = require("mongoose");

module.exports.broadcastModel = model('broadcastModel',Schema({
   user:{
       type:Schema.Types.ObjectId,
       ref:"signupmodel",
       required:true
   },
   context:{
       type:String,
       required:true
   },
   commnunityId:[{
       type:Schema.Types.ObjectId,
       ref:"communityModel"
   }],
   requirments:{
       type:String,
       required:true
   },
   finance:{
       type:String,
   } 
    
},{timestamps:true}))