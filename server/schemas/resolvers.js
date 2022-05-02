const { AuthenticationError } = require('apollo-server-express');
const { User, Item, Order } = require('../models');
const { signToken } = require('../utils/auth');
const { cloudinary } = require('../utils/cloudinary');
const { urlCompiler } = require('../utils/helpers');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id }).populate({
          path: 'orders.items',
        });
        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
        return user;
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
      const { filter, sort } = input;
      const shouldApplyFilters = filter !== null;
      const shouldApplySort = sort !== null;
      let items = await Item.find({});
      console.log(items);
      if (!shouldApplyFilters && !shouldApplySort) {
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
      const shouldApplyCategoriesFilter = filter.categories !== null;
      if (shouldApplyCategoriesFilter) {
        items = items.filter((a) => filter.categories.includes(a.category));
      }
      const shouldApplyColoursFilter = filter.colours !== null;
      if (shouldApplyColoursFilter) {
        items = items.filter((a) => filter.colours.includes(a.colour));
      }
      const shouldApplyPriceAscSort = sort.priceAsc;
      if (shouldApplyPriceAscSort) {
        items = items.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      }
      const shouldApplyPriceDescSort = sort.priceDesc;
      if (shouldApplyPriceDescSort) {
        items = items.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      }
      const shouldApplyNewestSort = sort.newest;
      if (shouldApplyNewestSort) {
        items = items.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      }
      const shouldApplyFeaturedSort = sort.featured;
      if (shouldApplyFeaturedSort) {
        items = items.sort((a, b) => Number(b.featured) - Number(a.featured));
      }
      return items;
    },
    item: async (parent, { itemId }) => {
      return await Item.findOne({ _id: itemId });
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.items',
        });
        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      console.log(url);
      console.log(args.items);
      const order = new Order({ items: args.items });
      console.log(order);
      const line_items = [];

      const { items } = await order.populate('items');
      console.log(items, 'line 92');
      for (let i = 0; i < items.length; i++) {
        const product = await stripe.products.create({
          name: items[i].title,
          description: items[i].description,
          images: [`${url}/images/${items[i].image[0]}`],
        });
        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: items[i].discountedPrice * 100,
          currency: 'gbp',
        });

        line_items.push({
          price: price.id,
          quantity: 1,
        });
      }
      console.log(line_items, 'line 111');
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
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
    addOrder: async (parent, { items }, context) => {
      if (context.user) {
        const order = new Order({ items });
        console.log(order);
        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },
    deleteItem: async (_, { itemId }) => {
      const deletedItem = await Item.findByIdAndDelete(itemId);
      return deletedItem;
    },
    updateItem: async (_, { input, itemId }) => {
      console.log(input);
      console.log({ ...input });
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
