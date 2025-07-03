const { json } = require('express')
const cloudinary = require('cloudinary').v2
const productModel = require('../model/productModel')

// function for add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller
    } = req.body

    const image1 = req.files.image1 && req.files.image1[0]
    const image2 = req.files.image2 && req.files.image2[0]
    const image3 = req.files.image3 && req.files.image3[0]
    const image4 = req.files.image4 && req.files.image4[0]

    const images = [image1, image2, image3, image4].filter(
      item => item !== undefined
    )

    const imageUrl = await Promise.all(
      images.map(async item => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: 'image'
        })
        return result.secure_url
      })
    )

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === 'true' ? true : false,
      sizes: JSON.parse(sizes),
      image: imageUrl,
      date: Date.now()
    }

    console.log(productData)

    const product = new productModel(productData);
    await product.save();

    console.log(
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller
    )
    // console.log(image1, image2, image3, image4);
    console.log(imageUrl)

    res.status(200).json({success:true, message:"product added"});
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal Server Error' })
  }
}

// function for list product
const listProduct = async (req, res) => {
    try {
        const product = await productModel.find({});
        res.status(200).json({success:true, product});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:'Internal Error'});
    }
}

// function for remove product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.status(200).json({success:true, message:'product delete'});

    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:'Internal Error'});
        
    }
}

// function for single product info
const singleProduct = async (req, res) => {
    try {
        const {productId} = req.body;
        const product = await productModel.findById(productId);
        res.status(200).json({success:true, product});
    } catch (error) {
         console.log(error);
        res.status(500).json({success:false, message:'Internal Error'});
    }
}

module.exports = { addProduct, listProduct, removeProduct, singleProduct }
