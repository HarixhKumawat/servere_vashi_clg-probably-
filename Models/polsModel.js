const {Schema,model} = require('mongoose')
const mongoose = require("mongoose");

const optionSchema = new Schema({
    content:{
        type:String
    },
    selected:[{
        type: Schema.Types.ObjectId,
        ref:"signupmodel"
    }]
})

module.exports.polsModel = model('polsModel',Schema({
    context:{
        type:String
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:"signupmodel"
    },
    communityId:{
        type: Schema.Types.ObjectId,
        ref:"communityModel"
    },
    options:[optionSchema]
},{timestamps:true}))