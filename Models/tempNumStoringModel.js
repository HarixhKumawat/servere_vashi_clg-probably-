const{Schema,model} = require("mongoose")
const jwt = require("jsonwebtoken")

module.exports.tempNumModel = model('tempNumModel',Schema({
    tempNum:{
        type:String,
        required:true
    }
}))