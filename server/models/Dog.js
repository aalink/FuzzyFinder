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
  zipCode: {
    type: Number,
    required: true,
  },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Dog = mongoose.model('Dog', dogSchema);

module.exports = Dog;
