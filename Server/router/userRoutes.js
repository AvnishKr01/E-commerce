const express = require("express");
const userController = require("../controller/userController");

const router = express.Router();

router.route("/userlogin").post(userController.userlogin);
router.route("/register").post(userController.register);
router.route("/adminlogin").post(userController.adminLogin);

module.exports = router;