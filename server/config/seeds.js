const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Guide Dogs' },
    { name: 'Hearing Dogs' },
    { name: 'Diabetic Alert Dogs' },
    { name: 'Mobility Assistance Dogs' },
    { name: 'Seizure Support Dogs' },
    { name: 'Autism Support Dogs' },
    { name: 'Severe Allergy Detection Dogs' },
    { name: 'Psychiatric Service Dogs' },
    { name: 'Visual Assistance Dogs' },
    { name: 'Emotional Support Dogs' },
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Luna',
      description:
        'A loving friend ready to help.',
      image: 'dog01.jpg',
      category: categories[0]._id,
      price: 5.99,
      quantity: 1
    },
    {
      name: 'Pepper',
      description:
        'A loving friend ready to help.',
      image: 'dog02.jpg',
      category: categories[0]._id,
      price: 1.99,
      quantity: 500
    },
    {
      name: 'Scout',
      category: categories[1]._id,
      description:
        'A loving friend ready to help.',
      image: 'dog03.jpg',
      price: 7.99,
      quantity: 20
    },
    {
      name: 'Marley',
      category: categories[1]._id,
      description:
        'A loving friend ready to help.',
      image: 'dog04.jpg',
      price: 3.99,
      quantity: 50
    },
    {
      name: 'Tank',
      category: categories[1]._id,
      description:
        'A loving friend ready to help.',
      image: 'dog05.jpg',
      price: 14.99,
      quantity: 100
    },
    {
      name: 'Cooper',
      category: categories[2]._id,
      description:
        'A loving friend ready to help.',
      image: 'dog06.jpg',
      price: 399.99,
      quantity: 30
    },

  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
