const { AuthenticationError } = require('apollo-server-express');
const { User, Item } = require('../models');
const { signToken } = require('../utils/auth');
const { cloudinary } = require('../utils/cloudinary');
const { urlCompiler } = require('../utils/helpers');

const resolvers = {
  Query: {
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    brandItems: async (parent, args, context) => {
      if (context.user.usertype === 'brand') {
        return await Item.find({ brand: context.user.username });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    items: async (parent, { input }, context) => {
      const { filter } = input;
      const shouldApplyFilters = filter !== null;
      let items = await Item.find({});
      console.log(items);
      if (!shouldApplyFilters) {
        return items;
      }
      const shouldApplyMaxPriceFilter = filter.maxPrice !== null;
      if (shouldApplyMaxPriceFilter) {
        items = items.filter((a) => a.price <= filter.maxPrice);
      }
      const shouldApplyMinPriceFilter = filter.minPrice !== null;
      if (shouldApplyMinPriceFilter) {
        items = items.filter((a) => a.price >= filter.minPrice);
      }
      return items;
    },
  },

  Mutation: {
    loginUser: async (parent, { email, password }) => {
      console.log(email, password);
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Can't find this user");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Wrong password!');
      }
      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, { username, email, password, usertype }) => {
      const user = await User.create({ username, email, password, usertype });

      if (!user) {
        throw new AuthenticationError('Something is wrong!');
      }

      const token = signToken(user);
      return { token, user };
    },
    deleteItem: async (_, { itemId }) => {
      const deletedItem = await Item.findByIdAndDelete(itemId);
      return deletedItem;
    },
    updateItem: async (_, { input, itemId }) => {
      const updatedItem = await Item.findByIdAndUpdate(
        itemId,
        { $set: { ...input } },
        {
          returnDocument: 'after',
        }
      );

      return updatedItem;
    },
    addItem: async (parent, { input }, context) => {
      console.log(input);
      const images = input.image;
      console.log(images, 'images');
      const uploadResponse = await Promise.all(images.map(async (image) => await cloudinary.uploader.upload(image)));
      console.log(uploadResponse, 'uploadResponse');
      // uploadResponse.forEach((e) => (e.url = urlCompiler(uploadResponse.url, 'w_1169,h_780,c_fill')));
      const imageUrls = uploadResponse.map((e) => urlCompiler(e.url, 'w_1169,h_780,c_fill'));
      console.log(imageUrls);
      const item = await Item.create({ ...input, image: imageUrls, brand: context.user.username });
      console.log(item);
      if (!item) {
        throw new AuthenticationError('Something is wrong!');
      }

      return item;
    },
  },
};

module.exports = resolvers;
