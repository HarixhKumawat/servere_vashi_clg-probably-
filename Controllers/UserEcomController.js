const { productmodel } = require("../Models/productmodel")
const {cartModel} = require("../Models/cartMode")
const asyncHandler = require('express-async-handler')
const expressAsyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

module.exports.searchBar = async(req,res)=>{
    try{
        const data = req.body

        const searching = await productmodel.findOne({productName:data.searchBody})
        console.log(searching)
        if(searching){
            res.status(200).json({data:searching,message:"Found"})}
        else{
            res.status(400).send("Not Found")
        }
    }
    catch(e){
        console.log(e)
    }
}

module.exports.catFilter = async(req,res)=>{
    try{
        const data = req.body
        const tempstroring = await productmodel.findOne({productCat:data.productCat})
        if(tempstroring)
        {
            console.log("moye moye",tempstroring)
            res.json({message:"jsk",data:tempstroring,status:200})
        }else{
            console.log("Nahi mila ")
            res.json({message:"sui ja",status:404   })
        }


    }
    catch(e){
        console.log(e)
        res.send(e)
    }
}


module.exports.shoppingCart = async(req,res)=>{
    try{
        const id = req.params.id
        const extrackingJWT = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(extrackingJWT,process.env.Skey,'' ,false)
        const userId = decoded._id


    }
    catch(e){

    }
}

module.exports.singleProductDetail = async(req,res)=>{
    try{
        const id = req.params.id
        const temp = await productmodel.findById(id)
        console.log("Hello")
        res.json({message:"Displayed",data:temp})
    }
    catch(e){
        res.json({error:e,message:e.message})
    }
}
module.exports.addToCart = async (req, res) => {
    try {
        const extractingJWT = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(extractingJWT, process.env.Skey)
        const userId = decoded.id

        const data = req.body
        console.log(data)
        const product = await productmodel.findById(data.id)

        const cart = await cartModel.findOne({ user: userId })

        if (!cart) {
            const newCart = new cartModel({
                user: userId,
                product: [{ pName: data.pName, pCount: data.pCount }]
            })
            await newCart.save()
            console.log(newCart)
            res.json({ message: "Product added to cart successfully", cart: newCart })
        } else {
            await cartModel.findByIdAndUpdate(cart._id, {
                $push: { product: { pName: data.pName, pCount: data?.pCount || 1 } }
            }, { new: true });
            console.log("Product added to existing cart")
            res.json({ message: "Product added to cart successfully", cart })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    } 
}

module.exports.viewCart = async(req,res) =>{
    try{
        const extractingJWT = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(extractingJWT, process.env.Skey)
        const userId = decoded.id

        const temp = await cartModel.findOne({user:userId}).populate("product.pName")
        console.log(temp.product)
        res.status(200).json({data:temp})
        
    }
    catch(e){
        res.status(500).json({ error: e.message })
    }
}

module.exports.checkOut = async(req,res) =>{
    try{
        const data = req.body
        const temp = await productmodel.find()
        console.log(temp.productCat)
        res.status(200).json({data:temp})
    }
    catch(e){
        res.status(500).json({ error: e.message })
    }
}