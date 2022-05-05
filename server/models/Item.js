const { Schema, model } = require('mongoose');

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
      required: false,
    },
    stock: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      required: false,
    },

    colour: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: false,
    },

    colour: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      required: false,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    ratings: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        username: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        rating: { type: Number, required: true },
      },
    ],
    numOfReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Item = model('Item', itemSchema);

module.exports = Item;
