const { Schema, model } = require('mongoose');

const itemSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: [
    {
      type: String,
      required: true,
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  size: [
    {
      type: String,
      trim: true,
    },
  ],
  brand: {
    type: String,
    required: true,
  },
});

const Item = model('Item', itemSchema);

module.exports = Item;
