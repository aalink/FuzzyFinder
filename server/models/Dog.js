const mongoose = require('mongoose');

const { Schema } = mongoose;
const Order = require('./Order');
const dogSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  rate: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }],
  user
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
