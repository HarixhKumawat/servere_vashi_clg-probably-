const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const { signupmodel } = require('../Models/signupmodel')



module.exports.loginAuth = asyncHandler(async (req, res, next)=>{
    var extrackingJWT

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            extrackingJWT = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(extrackingJWT,process.env.Skey,'' ,false)
            req.login = await signupmodel.findById(decoded.id).select('-number')
            next()
        }catch (e){
            console.log(e)
            res.status(401).send("not Authorised")
        }
    }
    if(!extrackingJWT){
        res.status(401).send("no token found")
    }
})

