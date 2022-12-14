const { AuthenticationError } = require('apollo-server-express');
const { User, Dog, Category, Order } = require('../models');
const { signToken } = require('../utils/auth');
const handleFileUpload = require('../utils/fileUpload');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const {
  GraphQLUpload,
  graphqlUploadExpress, // A Koa implementation is also exported.
} = require('graphql-upload');

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    categories: async () => {
      return await Category.find();
    },
    category: async (parent, {categoryName}) => {
      return await Category.findOne({ name: categoryName });
    },
    dogs: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }
      const response = await Dog.find({...params}).populate('category').populate('user');
      return response;
    },
    dog: async (parent, { _id }) => {
      return await Dog.findById(_id).populate('category').populate('user');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.dogs',
          populate: 'category'
        }).populate('dogs');

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.dogs',
          populate: 'category'
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ dogs: args.dogs });
      const line_items = [];

      const { dogs } = await order.populate('dogs');

      for (let i = 0; i < dogs.length; i++) {
        const dog = await stripe.products.create({
          name: dogs[i].name,
          description: dogs[i].description,
          images: [`${url}/images/${dogs[i].image}`]
        });

        const price = await stripe.prices.create({
          dog: dog.id,
          unit_amount: dogs[i].price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    }
  },
  Mutation: {
    addUser: async (parent, {userToAdd, dogToAdd}) => {
      console.log(userToAdd);
      console.log(dogToAdd);
      let user = await User.create(userToAdd);
      if (user.userType === 'owner') {
        const addDog = {...dogToAdd ,user: user._id}
        const dog = await Dog.create (addDog);
        user = await User.findOneAndUpdate({_id: user._id},{
          $addToSet: {
          dogs: dog._id
          }
        });
      }
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { dogs }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ dogs });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    updatePassword: async (parent, {currentPassword, newPassword}, context) => {
      console.log(currentPassword);
      console.log(newPassword);
      if (context.user) {
        const user = await User.findOne({ _id:context.user._id });
          const correctPw = await user.isCorrectPassword({password: currentPassword});
          if (!correctPw) {
            return 'Something went wrong!';
          }
          return await User.findByIdAndUpdate(context.user._id, { password : newPassword }, { new: true });
        }
      throw new AuthenticationError('Not logged in');
    },
    updateDog: async (parent, { _id, dogToUpdate }) => {

      return await Dog.findByIdAndUpdate(_id, { $set: { dogToUpdate } }, { new: true });
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addDog: async (parent, dogToSave, context) => {
      if (context.user) {
        const dogToSave = dogToSave;
        dogToSave.user = context.user._id;
        const dog=await Dog.create({dogToSave});
        return await User.findByIdAndUpdate(context.user._id, {$addToSet: { dogs: dog._id }}, { new: true });
      }
    },
    uploadFile: async (parent, {file}, context) => {
      const response = await handleFileUpload(file);
      return response;
    }
   }
};

module.exports = resolvers;
