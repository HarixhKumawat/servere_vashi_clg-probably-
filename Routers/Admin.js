const router = require("express").Router()
const {productAdd} = require("../Controllers/AdminController/ecomAdmin")
const {productShow} = require("../Controllers/AdminController/ecomAdmin")
const {adminHackathon} = require("../Controllers/AdminController/chatAdmin")
const {createCommunity} = require("../Controllers/textControllers/communityController")
const {adminLogin} = require("../Controllers/AdminController/adminController")
const {commLoop} = require("../Controllers/AdminController/adminController")
const {productFullDesc} = require("../Controllers/AdminController/ecomAdmin")
// const {userLoop} = require("../Controllers/AdminController/adminController")

// const multer = require("multer")

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "../../Files/prodctAdmin");
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now();
//       cb(null, uniqueSuffix + file.originalname);
//     },  
//   });

//        

//router.route('/product').post(productAdd,upload.single("image"))
router.route('/product').post(productAdd)
router.route('/productShow').post(productShow)
router.route('/addHackathon').post(adminHackathon)
router.route('/adminLogin').post(adminLogin)
router.route('/commLoop').post(commLoop)
router.route('/productDesc').post(productFullDesc)
// router.route('/userLoop').post(userLoop)


//community routes
router.route('/addCommunity').post(createCommunity)


module.exports = router