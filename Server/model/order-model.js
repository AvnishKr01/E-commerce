const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  address: {
    type: Object,
    required: true
  },
  status: {
    type: String,
    required: true,
    default:'Order Placed',
  },
  paymentMethod: {
    type: String,
    required: true
  },
  payment: {
    type: Boolean,
    required: true,
    default:false
  },
  date: {
    type: Number,
    required: true,
  },

})

const orderModel = new mongoose.model('order', orderSchema);

module.exports = orderModel;

// const mongoose = require('mongoose');

// // Sub-schema for individual order items
// const itemSchema = new mongoose.Schema({
//   _id: { type: String, required: true },
//   name: { type: String, required: true },
//   size: { type: String, required: true },
//   quantity: { type: Number, required: true },
//   price: { type: Number, required: true },
//   image: { type: String, required: true }
// }, { _id: false });

// // Sub-schema for address
// const addressSchema = new mongoose.Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true },
//   street: { type: String, required: true },
//   city: { type: String, required: true },
//   state: { type: String, required: true },
//   zipecode: { type: String, required: true },
//   country: { type: String, required: true },
//   phone: { type: String, required: true }
// }, { _id: false });

// // Main Order schema
// const orderSchema = new mongoose.Schema({
//   userId: {
//     type: String,
//     required: true
//   },
//   items: {
//     type: [itemSchema],
//     required: true
//   },
//   amount: {
//     type: Number,
//     required: true
//   },
//   address: {
//     type: addressSchema,
//     required: true
//   },
//   status: {
//     type: String,
//     required: true,
//     default: 'Order Placed'
//   },
//   paymentMethod: {
//     type: String,
//     required: true
//   },
//   payment: {
//     type: Boolean,
//     required: true,
//     default: false
//   },
//   date: {
//     type: Number,
//     required: true
//   }
// });

// const orderModel = mongoose.model('order', orderSchema);

// module.exports = orderModel;