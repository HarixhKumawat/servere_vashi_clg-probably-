const {loginmodel} = require("../Models/loginmodel")
const {otpmodel} = require("../Models/otpmodel")
const {signupmodel} = require("../Models/signupmodel")
const {tempNumModel} = require("../Models/tempNumStoringModel")
const {communityModel} = require("../Models/communityModel")

const otpGenerator = require("otp-generator")
const jwt = require('jsonwebtoken')
const {chatModel} = require("../Models/chatModel");



const generateToken = (id) =>{
    return jwt.sign({id},process.env.Skey )
}

module.exports.Login = async(req,res)=>{
    try{
        const data = req.body
        const user = await signupmodel.findOne({userName:data.userName})
        if((user.userName === data.userName) && (user.password === data.password)){
            console.log("Welcome to goa singham")
            res.status(200).json({message:"User Found",_id:user.id,userName:user.userName,dp:user.profilePicture,email:user.email,token:generateToken(user._id)})
        }
        else{
            res.status(400).send("Incorrect UserName of password")
        }

    }
    catch(e){   
        console.log(e)
    }
}


module.exports.showEtype = async(req,res) =>{
    try{
        const extrackingJWT = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(extrackingJWT,process.env.Skey,'' ,false)
        const id = decoded.id
        console.log('UserController.js > 41',id)


        const temp = await communityModel.find({ users: { $elemMatch: { $eq:id } } })       
            .populate('users',"-password" )

        res.status(200).json({orgy:temp})
    }
    catch(e){
        res.status(400).json({error:e,message:e.message})
    }
}

module.exports.getOneCommunity = async(req,res) =>{
    try{
        const {id} = req.params.id

        const temp = await communityModel.findById(id)
        res.status(200).json({orgy:temp})
    }
    catch(e){
        res.status(400).json({error:e,message:e.message})
    }
}

module.exports.otp = async(req,res)=>{
    try{
        const num = req.body.phone
        const storingUser = await signupmodel.findOne({
            phnumber : num 
        })
        if(storingUser) {
            return res.json({message:"User already exists",status:200})
        }

        const OTP = otpGenerator.generate(4,
            {
                digits:true,
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false
            })


            const otp = new otpmodel({phone: num, otp:OTP})
            console.log("Generated OTP is "+OTP)

            const final = await otp.save()
            return res.send("Mahesh Dalle"+OTP)

    }
    catch (e){
        console.log(e)
        res.send(e)
    }
}

module.exports.getDp = async(req,res) =>{
    try{

    }
    catch(e){
          res.status(400).json({error:e,message:e.message})
    }
}

module.exports.verifyOtp = async(req,res)=>{
    try
    {
        
        const num = req.body.phone
        const otpHolderDetails = await otpmodel.find({
        phone:num
    })
    console.log(otpHolderDetails)
    // console.log(req.body.otp)
    if(otpHolderDetails.length === 0)
    {
        
        return res.status("Please Verify the entered Number")
    }
        const recentOtp = otpHolderDetails.pop()
    console.log(recentOtp)
    if((recentOtp.otp === req.body.otp))//remove this
    {
        console.log("Verified")
        const user = await new tempNumModel({tempNum:num})
        const final = user.save()
        const id = user._id
        const deletingNum = await otpmodel.deleteMany({
            phone : recentOtp.phone
        })

        return res.status(200).json({message:"Verified",token:generateToken(id)})
    }
    else{
        console.log(req.body)
        console.log("Invalid OTP")
    }
    }
    
    catch(e){
        console.log(e)
    }
    
}
module.exports.signUp = async (req, res) => {
    try {
        const data = req.body;
        const modelStore = new signupmodel({
            firstName: data.fName,
            email: data.mail,
            lastName: data.lName,
            phNumber: data.phone,
            password: data.password,
            userName: data  .userName,
            dob: data.dob,
            gender: data.gender,
            engineerType1: data.e1,
            profilePicture :data?.profilePicture || "1"
        });

        await modelStore.save();

        const pljWork = await communityModel.find({name:data.e1})

        const updatedCommunity = await communityModel.findOneAndUpdate(
            { name: data.e1 },
            { $push: { users: modelStore._id } },
            { new: true }
        )
        console.log('UserController.js > 170',pljWork[0])


        const updatedChat = await chatModel.findByIdAndUpdate(pljWork[0]?.genralChat,{ $push: { users: modelStore._id } },{ new: true })

        res.json({ message: "Sign Up Done!!" })
    } catch (e) {
        console.error('Error:', e)
        res.status(300).json({ error: e, message: e.message })
    }
}

module.exports.changDp = async(req,res)=>{
    try{
        const extrackingJWT = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(extrackingJWT,process.env.Skey,'' ,false)
        const id = decoded.id
        const temp = req.params.id


        const updateUser = await signupmodel.findByIdAndUpdate(id,{profilePicture:temp})

        res.status(200).json({data:updateUser})

        
    }
    catch(e){
        res.status(400).json({error:e,message:e.message})
    }
}

module.exports.zinSakai = async(req,res)=>{
    try{
        console.log('X')
        res.json({message:"asjfksa"})
    }
    catch(e){

    }
}
