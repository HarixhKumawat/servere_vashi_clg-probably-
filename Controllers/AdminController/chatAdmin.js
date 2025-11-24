const asyncHandler = require('express-async-handler')
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")

const {hackathonModel} = require("../../Models/hackathonModel")


module.exports.adminHackathon = async(req,res)=>{
    try{
        const data = req.body
        const modelStore = new hackathonModel({
            name:data.hackathonName,
            url:data.hackathonUrl,
            context:data.hackathonContext,
            data:data.hackathonDate,
            mode:data.hackathonMode
        })
        await modelStore.save()
        res.status(200).json({message:"Hackathon Added"})
        
    }
    catch(e){
        console.log(e)
        res.status(400).json({error:e,message:e.message})
    }
}