// const {loginmodel} = require("../Models/loginmodel")
// const {otpmodel} = require("../Models/otpmodel")
// const {signupmodel} = require("../Models/signupmodel")
const { cartModel } = require("../../Models/cartMode")
const {communityModel} = require("../../Models/communityModel")

const jwt = require('jsonwebtoken')




const generateToken = (id) =>{
    return jwt.sign({id},process.env.Skey )
}



module.exports.adminLogin = async(req,res)=>{
    try{
        const data = req.body
        const temp1 = "admin123"
        const temp2 = "1234"
        if((data.userName === temp1) && (data.password === temp2)){
            console.log("Welcome to goa singham")
            res.status(200).json({message:"User Found",})
        }
        else{
            res.status(400).send("Incorrect UserName of password")
        }

    }
    catch(e){   
        console.log(e)
    }
}


module.exports.commLoop = async(req,res)=>{
    try{
        const temp = await communityModel.find().populate("users")
        console.log(temp)
        res.json({message:"Successphool",data:temp})
    }
    catch(e)
    {
        console.log(e)
        res.status(400).json({message:e.error,error:e})
    }
}

// module.exports.userLoop = async(req,res)=>{
//     try{
//         const data = req.body
//         const temp = await communityModel.findById(data.id)
//         const temp2 = temp.user
//         console.log(temp2)

//         res.json({message:"User Loop Created",data:temp2})
//     }
//     catch(e){
//         console.log(e)
//         res.status(400).json({message:e.error,error:e})
//     }
// }


module.exports.productReports = async(req,res)=>{
    try{
        const data = req.body
        const temp = await productmodel.find()
        res.json({message:"Success",data:temp})
    }
    catch(e){
        console.log(e)
        res.json({error:e,message:e.message})
    }
}

module.exports.orderReports = async(req,res)=>{
    try{
        const data = req.body
        const temp = await cartModel.find()
        res.json({message:"Success",data:temp})
    }
    catch(e){
        console.log(e)
        res.json({error:e,message:e.message})
    }
}