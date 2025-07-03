
// const createToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET)
// }

// ********************************Logic of user login*****************************

// const userlogin = async (req, res) => {
//   try {
//     const { email, password } = req.body

//     // check if the user is exist
//     const userExist = await userModel.findOne({ email })

//     if (!userExist) {
//       return res.status(400).json({ success: false, message: 'User not exist' })
//     }
//     const user = await bcrypt.compare(password, userExist.password)

//     if (user) {
//       res.status(200).json({
//         message: 'login successfully done',
//         token: await userExist.generateToken(),
//         userId: userExist._id.toString()
//       })
//     } else {
//       res.status(400).json({ success: false, message: 'Invalid credentials' })
//     }
//     // const user = await bcrypt.compare(password, userExist.password);

//     //     if (user) {
//     //         res.status(200).json({
//     //             mess: "login successfully done",
//     //             token: await userExist.createToken(),
//     //             userId: userExist._id.toString()
//     //         })

//     //     } else{
//     //         res.status(401).json({msg: "Invalid email or password"});
//     //     }
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ success: false, message: 'Internal Server Error' })
//   }
// }

// ****************************** Logic of register**************************

// const register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body

//     // Check if all fields are provided
//     if (!name || !email || !password) {
//       return res
//         .status(400)
//         .json({ success: false, message: 'All fields are required' })
//     }

//     // Check if user already exists
//     const exist = await userModel.findOne({ email })
//     if (exist) {
//       return res
//         .status(409)
//         .json({ success: false, message: 'User already exists' })
//     }

//     // Validate email format
//     if (!validator.isEmail(email)) {
//       return res
//         .status(400)
//         .json({ success: false, message: 'Please enter a valid email' })
//     }

//     // Validate password length
//     if (password.length < 8) {
//       return res.status(400).json({
//         success: false,
//         message: 'Password must be at least 8 characters long'
//       })
//     }

//     // Hash the password
//     // const salt = await bcrypt.genSalt(10)
//     const salt = 10
//     const hash_password = await bcrypt.hash(password, salt) // ✅ Correct password input here

//     // Create and save the new user
//     // const newUser = new userModel({
//     //   name,
//     //   email,
//     //   password: hash_password
//     // })

//     // const user = await newUser.save()

//     const newUser = await userModel.create({
//       name,
//       email,
//       password: hash_password
//     })

//     // Generate authentication token
//     // const token = createToken(user._id)

//     // Send success response with token
//     res.status(200).json({
//       message: 'User registered successfully',
//       token: await newUser.generateToken(),
//       userId: newUser._id.toString()
//     })
//   } catch (error) {
//     console.error('Register Error:', error)
//     res.status(500).json({ success: false, message: 'Internal Server Error' })
//   }
//   // try {
//   //     const {name, email, password} = req.body;
//   //     const exist = await userModel.findOne({email});

//   //     if(exist){
//   //         return res.status(400).json({mess:"email already exist"});
//   //     }

//   //     const salt = 10;
//   //     const hash_password = await bcrypt.hash("password", salt);
//   //     const userCreate = await userModel.create({
//   //         name,
//   //         email,
//   //         password: hash_password,
//   //     });
//   //     res.status(200).json({
//   //         mess:"Register successfully",
//   //         token: await userCreate.generateToken(),
//   //         userId: userCreate._id.toSting(),
//   //     })
//   // } catch (error) {
//   //     console.log(error);

//   // }
// }
// Logic of admin login

// const adminLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body

//     if (
//       email === process.env.ADMIN_EMAIL &&
//       password === process.env.ADMIN_PASSWORD
//     ) {

//       // const token = jwt.sign(email + password, process.env.JWT_SECRET)
//       const token = jwt.sign({ role: 'admin', email }, process.env.JWT_SECRET, {
//         expiresIn: '1d'
//       })

//       res.status(200).json({ success: true, message: 'successfully', token })

//     } else {
//       res.status(400).json({ success: false, message: 'fail' })
//     }

//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ success: false, message: 'Internal Server Error' })
//   }
// }

// module.exports = { userlogin, register, adminLogin }

const userModel = require('../model/userModel');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ************************** USER LOGIN **************************
const userlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existUser = await userModel.findOne({ email: email.trim() });

    if (!existUser) {
      return res.status(400).json({ success: false, message: 'User does not exist' });
    }

    const isMatch = await bcrypt.compare(password, existUser.password);
    // const token = existUser.generateToken();

    if (isMatch) {
      res.status(200).json({
        success: true,
        message: 'Login successful',
        token: await existUser.generateToken(),
        userId: existUser._id.toString(),
      });
    } else {
      res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// ************************** USER REGISTRATION **************************
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email' });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long' });
    }

    const exist = await userModel.findOne({ email});
    if (exist) {
      return res.status(409).json({ success: false, message: 'User already exists' });
    }

    const hash_password = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: hash_password,
    });
     
    // await newUser.save(); 
    //  const token = newUser.generateToken();

    res.status(200).json({
      success: true,
      message: 'User registered successfully',
      token: await newUser.generateToken(),
      userId: newUser._id.toString(),
    });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// ************************** ADMIN LOGIN **************************                    
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ password, email }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
      res.status(200).json({ success: true, message: 'Login successful', token });
    } else {
      res.status(400).json({ success: false, message: 'Invalid admin credentials' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = { userlogin, register, adminLogin };
