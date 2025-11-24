const {Schema,model}  = require("mongoose")

module.exports.loginmodel = model('loginmodel',Schema({
    userName:String,
    password:String
}))

