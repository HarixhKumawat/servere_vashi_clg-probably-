const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const { tempNumModel } = require('../Models/tempNumStoringModel')



module.exports.signupAuth = asyncHandler(async (req, res, next)=>{
    var extrackingJWT
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            extrackingJWT = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(extrackingJWT,process.env.Skey,'' ,false)
            req.login = await tempNumModel.findById(decoded.id).select('-number')
            next()
        }catch (e){
            console.log(e)
            res.status(401).send("not Authorised")
            console.log("happy dhanteras")
        }
    }   
    if(!extrackingJWT){
        res.status(401).send("no token")
    }
})

