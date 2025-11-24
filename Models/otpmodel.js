const {Schema,model} = require('mongoose')

module.exports.otpmodel = model('otpmodel',Schema({
    phone : {
        type:String,
        required:true
    },
    otp : {
        type:String,
        required:true
    },
    generatedAt: {
        type:Date,
        default:Date.now,
        index:{expiresIn: 45}
    }
},{timestamps:true}))