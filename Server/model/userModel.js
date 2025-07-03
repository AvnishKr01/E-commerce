  const mongoose = require('mongoose')
  const jwt = require('jsonwebtoken')

  const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      cartData: {
        type: Object,
        default: {}
      }
    },
    { minimize: false }
  )

  // jwt token
  userSchema.methods.generateToken = async function () {
      try {
          return jwt.sign({
              userId: this._id.toString(),
              email: this.email,
          },
          process.env.JWT_SECRET,
          {
              expiresIn:"30d",
          }
      );
      } catch (error) {
          console.log(error);

      }
  }

  const userModel = new mongoose.model('user', userSchema)
  module.exports = userModel
