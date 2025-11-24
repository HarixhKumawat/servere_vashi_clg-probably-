const asyncHandler = require('express-async-handler')
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")
const {communityModel} = require("../../Models/communityModel")
const {hackathonModel} = require("../../Models/hackathonModel");
const { productmodel } = require('../../Models/productmodel');
const {broadcastModel} = require("../../Models/broadcastModel")
const {chatModel} = require("../../Models/chatModel")


module.exports.getHackathon = async(req,res)=>{
    try{
        const data = req.body   
        
        const temp = await hackathonModel.find()
        res.json({message:"Hackathon added Successfull",data:temp})    
    }
  catch(e){
      res.json({error:e,meessage:e.meessage})
    }
}

module.exports.createCommunity = async(req,res)=>{
    try{
        const {communityName,introduction,descr} = req.body
//        const extractingJWT = req.headers.authorization.split(' ')[1];
//        const decoded = jwt.verify(extractingJWT, process.env.Skey, '', false);
        const exists = await communityModel.find({name:communityName})
        if(exists.length!==0){
            res.send({status:500,message:"Communiry ALREADY EXISTS"})
        }
        const chatData = {
            chatName: communityName+"GenralChat",
            isGroupChat: true,
//            groupAdmin:decoded.id
        }
        console.log(chatData)
        const createdChat = await chatModel.create(chatData)
        
        const data = await new communityModel({name:communityName,introduction:introduction,desc:descr,genralChat:createdChat._id})
        await data.save()
        
        
        res.send({data,status:200,message:"Created"})
    }
    catch(e){
        console.log(e)
        res.send(e)
    }
}

module.exports.getCommuntities = async(req,res)=>{
    try{
        const data = await communityModel.find()

        res.send({data,status:200,message:"Created"})
    }
  catch(e){
        console.log(e)
    }
}


module.exports.sendBroadcast = async(req,res)=>{
  try{
      const data = req.body 
      const token = req.headers.authorization.split(' ')[1];
      const temp1 = jwt.verify(token, process.env.Skey, '', false);

    //   if(!id)
    //   {
    //       res.send("Not Found User").status(404)
    //   }
      if(!data)
      {
        res.send("Data Not Found").status(404)
      }

      console.log(data)
      const modelStore = new broadcastModel({
        user:temp1.id,
        context:data.context,
        commnunityId:"65cbc99b551a2594389c88a2",
        requirments:data.require,
        finance:data.fin?data.fin:null
      });

      await modelStore.save()
       
      res.status(200).json({message:"Broadcast succesfull"})

  }
  catch(e){
      console.log(e)
      res.json({error:e,message:e.message})
  }
}

module.exports.getBroadcast = async(req,res) =>{
   try{
    const data = req.body
    const temp = await broadcastModel.find().populate("user")
    res.json({message:"Broadcassst succussfully shown",data:temp})
    }
    catch(e){
        console.log(e)
        res.status(400).json({error:e,message:e.message})
    }
}


module.exports.joinComunity = async(req,res) =>{
    try{
        const extrackingJWT = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(extrackingJWT,process.env.Skey,'' ,false)
        const uId = decoded.id

        const {id} = req.params
        const user = await communityModel.findById(id)
        console.log(user)
        const exist = user.users.includes(uId)
        console.log(exist)
        if(!exist){
            console.log(id)
            const temp = await communityModel.findByIdAndUpdate(id,{ $push: { users: uId } },{new:true})

            res.status(200).json({message:temp})

        }
        else{
            res.status(404).json({message:"Jai Shree Krisna"})
            console.log("User already belongs to the community")
        }
     
    }
    catch(e){
        console.log(e)
        res.status(400).json({error:e,message:e.error})
    }
}


module.exports.leaveComm = asyncHandler(async (req, res) => {
    try{
      const extrackingJWT = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(extrackingJWT,process.env.Skey,'' ,false)
      const uId = decoded.id
      
          const {id} = req.params
          console.log(id)
          const temp = await communityModel.findByIdAndUpdate(id,{ $pull: { users: uId } },{new:true})
          res.status(200).json({message:temp})
    }
    catch(e){
      console.log(e)
      res.status(400).json({error:e,message:e.error})
    }
  })

  module.exports.getGeneralChat = asyncHandler(async (req,res) => {
    try{
        const id = req.params.id
        const temp = chatModel.find(id)

    }
    catch(e){

    }
  })