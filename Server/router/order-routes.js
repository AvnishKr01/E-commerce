const express = require('express');
const orderController = require('../controller/order-controller');
const adminAuth = require('../middleware/admin-auth');
const authUser = require('../middleware/auth');
const Razorpay = require('razorpay');

const router = express.Router();

//Admin orders

router.route('/adminlist').post(adminAuth, orderController.adminOrders);
router.route('/status').post(adminAuth, orderController.updateStatus);

// paymnet methds

router.route('/cod').post(authUser, orderController.placedOrder);
router.route('/razorpay').post(authUser, orderController.placedOrderRazorpay);
router.route('/stripe').post(authUser, orderController.placedOrderStripe);

// user features

router.route('/userorder').post(authUser, orderController.userOrders);

// verify payment 
router.route('/verifystripe').post(authUser, orderController.verifyStripe)
router.route('/verifyrazorpay').post(authUser, orderController.verifyrazorpay)

module.exports = router;