const express = require('express');
const productcontroller = require('../controller/product-controller');
const upload = require('../middleware/multer');
const adminAuth = require('../middleware/admin-auth');

const router = express.Router();

router.route("/add").post(adminAuth, upload.fields([{name:"image1", maxCount:1}, {name:"image2", maxCount:1}, {name:"image3", maxCount:1}, {name:"image4", maxCount:1},]), productcontroller.addProduct);
router.route("/remove").post(adminAuth, upload.fields(), productcontroller.removeProduct);
router.route("/list").get(upload.fields(), productcontroller.listProduct);
router.route("/single").post(upload.fields(), productcontroller.singleProduct);

module.exports = router;