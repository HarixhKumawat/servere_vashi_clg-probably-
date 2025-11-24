const asyncHandler = require('express-async-handler')
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")

const {signupmodel} = require("../../Models/signupmodel")
const {chatModel} = require("../../Models/chatModel")



module.exports.accessChat = asyncHandler(async (req, res) => {
    const { id } = req.params
    const extrackingJWT = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(extrackingJWT,process.env.Skey,'' ,false)
    if (!id) {
      console.log("Userid not sent");
      return res.sendStatus(400);
    }
  
    var isChat = await chatModel.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: decoded.id } } },
        { users: { $elemMatch: { $eq: id } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");
  
    isChat = await signupmodel.populate(isChat, {
      path: "latestMessage.sender",
      select: "firstName lastName",
    });
  
    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [decoded.id, id],
      };
  
      try {
        const createdChat = await chatModel.create(chatData);
        const FullChat = await chatModel.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        );
        res.status(200).json(FullChat);
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
    }
})

module.exports.fetchChats = asyncHandler(async (req, res) => {
  try {
      const extrackingJWT = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(extrackingJWT,process.env.Skey,'' ,false)
      const id = decoded.id
      const result = await chatModel.find({ users: { $elemMatch: { $eq: decoded.id } }})
          .populate({ path: 'users', select: 'firstName lastName profilePicture engineerType1' })
          .populate("latestMessage")
          .sort({ updatedAt: -1 });

      if (result.length === 0) {
          return res.status(404).send({ message: 'Chats not found' });
      }

      const populatedResult = await signupmodel.populate(result, {
          path: "latestMessage.sender",
          select: "firstName lastName"
      });
      res.status(200).send(populatedResult);
  } catch (e) {
      console.log(e);
      res.status(500).send({ message: 'Internal Server Error' });
  }
})

module.exports.crtGroupChat = asyncHandler(async (req, res) => {
  const { userIds, chatName, chatDesc,chatType } = req.body;
  const extractingJWT = req.headers.authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(extractingJWT, process.env.Skey, '', false);
    if (!userIds || !userIds.length) {
      console.log("User IDs not sent");
      return res.sendStatus(400);
    }
    const chatData = {
      desc: chatDesc,
      type: chatType,
      chatName: chatName,
      isGroupChat: true,
      groupAdmin: decoded.id,
      users: [...userIds, decoded.id] 
    };
    console.log(chatData)
    const createdChat = await chatModel.create(chatData)
    const fullChat = await chatModel.findOne({ _id: createdChat._id })
      .populate("users", "-password");

    res.status(200).json(fullChat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

module.exports.leaveGrp = asyncHandler(async (req, res) => {
  try{
    const extrackingJWT = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(extrackingJWT,process.env.Skey,'' ,false)
    const uId = decoded.id
    
        const {id} = req.params
        console.log(id)
        const temp = await chatModel.findByIdAndUpdate(id,{ $pull: { users: uId } },{new:true})
        res.status(200).json({message:temp})
  }
  catch(e){
    console.log(e)
    res.status(400).json({error:e,message:e.error})
  }
})

module.exports.joinGrp = async(req,res) =>{
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
        const temp = await chatModel.findByIdAndUpdate(id,{ $push: { users: uId } },{new:true})
        res.status(200).json({message:temp})
      }
      else{
        res.status(404).json({message:"User exist"})
      }
   
  }
  catch(e){
      console.log(e)
      res.status(400).json({error:e,message:e.error})
  }
}


module.exports.getGrp = async(req,res)=>{
  try{
    const extrackingJWT = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(extrackingJWT,process.env.Skey,'' ,false)
    const id = decoded.id
    

    const temp = await chatModel.find({ users: { $elemMatch: { $eq:id } } ,isGroupChat:true})
    res.status(200).json({orgy:temp})
      

  }
catch(e){
      console.log(e)
  }
}



// module.exports.Comunity = asyncHandler(req,res => {
//   try{

//   }
//   catch{
//     res.status(400)
//   }
// })