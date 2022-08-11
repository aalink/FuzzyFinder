const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  dogs: [{
    type: Schema.Types.ObjectId,
    ref: 'Dog',
    required: true,
  }],
  quantity: [{
    type: Number,
    required: true,
  }]

});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
