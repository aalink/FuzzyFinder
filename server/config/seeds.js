const db = require("./connection");
const { User, Product, Category } = require("../models");

db.once("open", async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: "Guide Dogs" },
    { name: "Hearing Dogs" },
    { name: "Diabetic Alert Dogs" },
    { name: "Mobility Assistance Dogs" },
    { name: "Seizure Support Dogs" },
    { name: "Autism Support Dogs" },
    { name: "Severe Allergy Detection Dogs" },
    { name: "Psychiatric Service Dogs" },
    { name: "Visual Assistance Dogs" },
    { name: "Emotional Support Dogs" },
  ]);

  console.log("categories seeded");

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: "Luna",
      description: "Hi, I'm Luna, a 2-year-old black labrador. I'm professionally trained as a guide dog, I have great memory, pay attention to the surroundings. I'm willing to learn your environment and help you concentrate. I'm also a sweet, playful girl, love playing gently with seniors or kids. If you're looking for a smart, gentle guide dog for a few days, please request for me! Just follow the directions below. After you turn in your application, my owner will contact you to set up an appointment to meet. ",
      image: "dog01.jpg",
      category: categories[0]._id,
      price:5,
      zipcode: 30004,
    },
    {
      name: "Pepper",
      category: categories[2]._id,
      description: "A loving friend ready to help.",
      image: "1-dog-black-and-white.jpg",
      price: 8,
      zipcode: 30005,
    },
    // {
    //   name: "Scout",
    //   category: categories[1]._id,
    //   description: "A loving friend ready to help.",
    //   image: "dog03.jpg",
    //   price:5,
    //   zipcode: 30005,
    // },
    {
      name: "Marley",
      category: categories[1]._id,
      description: "A loving friend ready to help.",
      image: "dog04.jpg",
      price:8,
      zipcode: 30009,
    },
    {
      name: "Tank",
      category: categories[1]._id,
      description: "A loving friend ready to help.",
      image: "dog05.jpg",
      price: 5,
      zipcode: 30022,
    },
    // {
    //   name: "Cooper",
    //   category: categories[2]._id,
    //   description: "A loving friend ready to help.",
    //   image: "dog06.jpg",
    //   price: 10,
    //   zipcode: 30024,
    // },
    {
      name: "Marky",
      category: categories[2]._id,
      description: "A loving friend ready to help.",
      image: "2-dog-mikey-mouse-ears.jpg",
      price: 10,
      zipcode: 30008,
    },
    {
      name: "Penny",
      description: "A loving friend ready to help.",
      image: "dog02.jpg",
      category: categories[0]._id,
      price:5,
      zipcode: 30003,
    },
    {
      name: "Ricky",
      category: categories[2]._id,
      description: "A loving friend ready to help.",
      image: "3-boxer-mix.jpg",
      price: 8,
      zipcode: 30023,
    },
    {
      name: "Danny",
      category: categories[2]._id,
      description: "A loving friend ready to help.",
      image: "4-chihuahua.jpg",
      price: 10,
      zipcode: 30023,
    },

    {
      name: "Terry",
      category: categories[2]._id,
      description: "A loving friend ready to help.",
      image: "5-english-cocker-spaniel.jpg",
      price:8,
      zipcode: 30023,
    },
    {
      name: "Mikey",
      category: categories[2]._id,
      description: "A loving friend ready to help.",
      image: "6-dog-brown.jpg",
      price: 10,
      zipcode: 30077,
    },
    {
      name: "Davey",
      category: categories[2]._id,
      description: "A loving friend ready to help.",
      image: "7-australian-shepherd.jpg",
      price: 8,
      zipcode: 30077,
    },
    {
      name: "Timmy",
      category: categories[2]._id,
      description: "A loving friend ready to help.",
      image: "8-dog-playful.jpg",
      price: 10,
      zipcode: 30077,
    },
    {
      name: "Tommy",
      category: categories[2]._id,
      description: "A loving friend ready to help.",
      image: "9-doberman.jpg",
      price: 10,
      zipcode: 30077,
    },
    {
      name: "Joey",
      category: categories[2]._id,
      description: "A loving friend ready to help.",
      image: "10-poodle.jpg",
      price: 10,
      zipcode: 30097,
    },
    {
      name: "Robby",
      category: categories[2]._id,
      description: "A loving friend ready to help.",
      image: "11-dog-blackbrownmix.jpg",
      price: 10,
      zipcode: 30097,
    },
    {
      name: "Johnny",
      category: categories[2]._id,
      description: "A loving friend ready to help.",
      image: "12-german-longhaired-pointer.jpg",
      price: 15,
      zipcode: 30097,
    },
    {
      name: "Brian",
      category: categories[2]._id,
      description: "A loving friend ready to help.",
      image: "13-continental-bulldog.jpg",
      price: 10,
      zipcode: 30097,
    },
    {
      name: "Willy",
      category: categories[2]._id,
      description: "A loving friend ready to help.",
      image: "14-dalmatian.jpg",
      price: 15,
      zipcode: 30026,
    },
    {
      name: "Minnie",
      category: categories[2]._id,
      description: "A loving friend ready to help.",
      image: "15-labrador-2.jpg",
      price: 10,
      zipcode: 30026,
    },
    {
      name: "Robin",
      category: categories[2]._id,
      description: "A loving friend ready to help.",
      image: "16-labrador-1.jpg",
      price: 10,
      zipcode: 30087,
    },
    {
      name: "Jan",
      category: categories[2]._id,
      description: "A loving friend ready to help.",
      image: "17-weimaraner.jpg",
      price: 10,
      zipcode: 30087,
    },
    {
      name: "Franky",
      category: categories[2]._id,
      description: "A loving friend ready to help.",
      image: "18-jack-russell.jpg",
      price: 8,
      zipcode: 30087,
    },
    {
      name: "Brady",
      category: categories[2]._id,
      description: "A loving friend ready to help.",
      image: "19-bulldog.jpg",
      price: 10,
      zipcode: 30087,
    },
    {
      name: "Demi",
      category: categories[2]._id,
      description: "A loving friend ready to help.",
      image: "20-australian-shepherd.jpg",
      price: 10,
      zipcode: 30087,
    },
  ]);

  console.log("products seeded");

  await User.deleteMany();

  await User.create({
    firstName: "Pamela",
    lastName: "Washington",
    email: "pamela@testmail.com",
    password: "password12345",
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id],
      },
    ],
  });

  await User.create({
    firstName: "Elijah",
    lastName: "Holt",
    email: "eholt@testmail.com",
    password: "password12345",
  });

  console.log("users seeded");

  process.exit();
});
