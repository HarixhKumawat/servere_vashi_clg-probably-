const {Schema,model} = require('mongoose')

module.exports.signupmodel = model('signupmodel',Schema({
    firstName : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true
    },
    lastName : {
        type:String,
        required:true
    },
    phNumber :{
        type:String,
        required:true
    },
    password :{
        type:String,
        required:true
    },
    userName :{
        type:String,
        required:true
    },
    gender :{
        type : String,
        required : true
    },
    dob :{
        type : Date ,
        required :true
    },
    engineerType1: {
        type : String,
        required :true
    },
    engineerType2 : {
        type : String
    },
    profilePicture : {
        type : String
    }
}))