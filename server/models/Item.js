const { Schema, model } = require('mongoose');
// const formatDate = require('../utils/helpers');

const itemSchema = new Schema(
  {
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
<<<<<<< HEAD
  ],
  price: {
    type: Number,
    required: true,
  },
  salePrice: {
    type: Number,
    required: false,
  },
  stock: {
    type: Number,
    required: true,
  },
  size: [
    {
      type: String,
      trim: true,
=======
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
    discountedPrice: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
>>>>>>> a8e2ac2426fd6dadb41ef855dc0914f909d8093b
    },
  },
<<<<<<< HEAD
  colour: {
    type: String,
    required: false,
  },
});
=======
  {
    toJSON: {
      getters: true,
    },
  }
);
>>>>>>> a8e2ac2426fd6dadb41ef855dc0914f909d8093b

const Item = model('Item', itemSchema);

module.exports = Item;
