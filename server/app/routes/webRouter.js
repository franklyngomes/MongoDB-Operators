const express = require('express')
const RestaurantController = require('../controller/RestaurantController')
const router = express.Router()
const ImageUpload = require('../helper/ImageUpload')
const multer = require("multer")
const upload = multer()


router.get('/one',upload.none(), RestaurantController.One )
router.get('/two',upload.none(), RestaurantController.Two)
router.get('/three',upload.none(), RestaurantController.Three)
router.get('/four',upload.none(), RestaurantController.Four)
router.get('/five',upload.none(), RestaurantController.Five)
router.get('/six',upload.none(), RestaurantController.Six)
router.get('/six',upload.none(), RestaurantController.Seven)


module.exports = router