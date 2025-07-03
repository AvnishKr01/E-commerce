const userModel = require('../model/userModel')
const mongoose = require('mongoose');

// Add product to user cart
const addCart = async (req, res) => {
  try {
    const userId = req.userId;
    const {itemId, size } = req.body;

       // Check if userId is valid
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid user ID" });
    }
    const userData = await userModel.findById(userId)
    // console.log("🔍 Fetched userData:", userData);

    if (!userData) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }
    let cartData = await userData.cartData

    if (cartData[itemId]) { 
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1
      } else {
        cartData[itemId][size] = 1
      }
    } else {
      cartData[itemId] = {}
      cartData[itemId][size] = 1
    }

    await userModel.findByIdAndUpdate(userId, { cartData })
    res.status(200).json({ success: true, message: 'product add to cart' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal Error' })
  }
}
// update user cart
const updateCart = async (req, res) => {
  try {
    const userId = req.userId;
    const {itemId, size, quantity } = req.body;
    const userData = await userModel.findById(userId)
    let cartData = await userData.cartData

    cartData[itemId][size] = quantity

    await userModel.findByIdAndUpdate(userId, { cartData })
    res.status(200).json({ success: true, message: 'Cart Updated' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal Error' })
  }
}
// get user cart data
const getUserCart = async (req, res) => {
  try {
    const userId  = req.userId; // ✅ Use req.body, not headers (middleware sets this)

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }
    let cartData = await userData.cartData;

    res.status(200).json({ success: true, cartData});

  } catch (error) {
    console.error("Get Cart Error:", error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = { addCart, updateCart, getUserCart }
