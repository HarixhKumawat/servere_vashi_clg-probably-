const {Schema,model} = require('mongoose')

module.exports.productmodel = model('productmodel',Schema({
    productName : {
        type:String,
        required:true
    },
    productQuantity: {
        type : String,
        required: true
    },
    productPrice : {
        type:String,
        required:true
    },
    productDesc: {
        type:String,
        required:true
    },
    productRating : {
        rating:[{
            userid:{
                type:Schema.Types.ObjectId,
                ref:"signupmodel"
            },
            ANS:[{}]
        }]
    },          
    productCat : {
        type:String,
        required:true
    },
    productStock : {
        type:String,
        required:true
    },
    // productImage : {
    //     type:String,
    //     required:false
    // }
},{timestamps:true}))