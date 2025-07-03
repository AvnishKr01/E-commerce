const express = require('express');
const cartController = require('../controller/cart-controller');
const authUser = require('../middleware/auth');

const router = express.Router();

router.route('/getdata').post(authUser,cartController.getUserCart);
router.route('/add').post(authUser, cartController.addCart);
router.route('/update').post(authUser, cartController.updateCart);

module.exports = router;