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
    items: async () => {
      const itemList = await Item.find({});
      console.log(itemList);
      return itemList;
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
    addItem: async (parent, { input }, context) => {
      console.log(input);
      const uploadResponse = await cloudinary.uploader.upload(input.image);
      uploadResponse.url = urlCompiler(uploadResponse.url, 'w_1169,h_780,c_fill');
      const item = await Item.create({ ...input, image: uploadResponse.url });
      console.log(item);
      if (!item) {
        throw new AuthenticationError('Something is wrong!');
      }

      return item;
    },
  },
};

module.exports = resolvers;
