const { model } = require("mongoose")
const {productmodel} = require("../../Models/productmodel")
const multer = require("multer")

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "../../Files/prodctAdmin");
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now();
//       cb(null, uniqueSuffix + file.originalname);
//     },  
//   });

// const upload = multer({ storage: storage });

module.exports.productAdd = async(req,res)=>{
    try{
        const data = req.body
        // const imageName = req.file.filename;
        console.log(data);
        const modelStore = new productmodel({
            productName : data.pName,
            productPrice : data.pPrice, 
            productDesc: data.pDesc,
            productQuantity : data.pquant,
            productStock : data.pquant,
            productCat : data.pCat,
            //productImage : imageName
        })
        console.log(data)
        await modelStore.save()
        res.json({message:"Product Added"})
    }
    catch(e){
        console.log(e)
        res.json({error:e,message:e.message})
    }
}

module.exports.productShow = async(req,res)=>{
    try{
        const data = req.body
        const temp = await productmodel.find()
        res.json({message:"Successphool",data:temp})
    }
    catch(e){
        console.log(e)
        res.json({error:e,message:e.message})
    }

}

module.exports.productFullDesc = async(req,res)=>{
    try{
        const {id} = req.body

        const temp = await productmodel.findById(id)

        res.status(200).json({message:"Productss!!!",temp})
    }
    catch(e){
        res.status(400).json({error:e,message:e.message})
    }
}