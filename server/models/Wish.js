const mongoose = require('mongoose');

const { Schema } = mongoose;

const wishSchema = new Schema({
  createdDate: {
    type: Date,
    default: Date.now,
  },
  item: {
    type: Schema.Types.ObjectId,
    ref: 'Item',
  },
});

const Order = mongoose.model('Wish', wishSchema);

module.exports = Order;
