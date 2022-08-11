const db = require("./connection");
const { User, Dog, Category } = require("../models");

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

  await User.deleteMany();

  await User.insertMany([{
    firstName: "Pamela",
    lastName: "Washington",
    email: "pamela@testmail.com",
    password: "password12345",
    userType: "owner"
  },
  {
    firstName: "Hector",
    lastName: "Farias",
    email: "Hector@testmail.com",
    password: "password12345",
    userType: "owner"
  },
  {
    firstName: "Elijah",
    lastName: "Holt",
    email: "eholt@testmail.com",
    password: "password12345",
    userType: "patient"
  },
  {
    firstName: "Lucy",
    lastName: "Lu",
    email: "l.lu@testmail.com",
    password: "password12345",
    userType: "owner"
  },
  {
    firstName: "Ma",
    lastName: "Donna",
    email: "madonna@testmail.com",
    password: "password12345",
    userType: "patient"
  }]);

  console.log("users seeded");

const userIds = await User.find({userType: "owner"});
// console.log(userIds);
  await Dog.deleteMany();

  const Dogs = await Dog.insertMany([
    {
      name: "Luna",
      description: "Hi, I'm Luna, a 2-year-old black labrador. I'm professionally trained as a guide dog, I have great memory, pay attention to the surroundings. I'm willing to learn your environment and help you concentrate. I'm also a sweet, playful girl, love playing gently with seniors or kids. If you're looking for a smart, gentle guide dog for a few days, please request for me! Just follow the directions below. After you turn in your application, my owner will contact you to set up an appointment to meet. ",
      image: "dog01.jpg",
      rate:5,
      zipCode: 30004,
      category: [categories[Math.floor(Math.random()*(categories.length))]._id],
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: "Pepper",
      description: "A loving friend ready to help.",
      image: "1-dog-black-and-white.jpg",
      rate: 8,
      zipCode: 30005,
      category: [categories[Math.floor(Math.random()*(categories.length))]._id],
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    // {
    //   name: "Scout",
    //   description: "A loving friend ready to help.",
    //   image: "dog03.jpg",
    //   rate:5,
    //   zipCode: 30005,
      // category: [categories[Math.floor(Math.random()*(categories.length))]._id],
      // user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    // },
    {
      name: "Marley",
      description: "A loving friend ready to help.",
      image: "dog04.jpg",
      rate:8,
      zipCode: 30009,
      category: [categories[Math.floor(Math.random()*(categories.length))]._id],
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: "Tank",
      description: "A loving friend ready to help.",
      image: "dog05.jpg",
      rate: 5,
      zipCode: 30022,
      category: [categories[Math.floor(Math.random()*(categories.length))]._id],
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    // {
    //   name: "Cooper",
    //   description: "A loving friend ready to help.",
    //   image: "dog06.jpg",
    //   rate: 10,
    //   zipCode: 30024,
      // category: [categories[Math.floor(Math.random()*(categories.length))]._id],
      // user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    // },
    {
      name: "Marky",
      description: "A loving friend ready to help.",
      image: "2-dog-mikey-mouse-ears.jpg",
      rate: 10,
      zipCode: 30008,
      category: [categories[Math.floor(Math.random()*(categories.length))]._id],
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: "Penny",
      description: "A loving friend ready to help.",
      image: "dog02.jpg",
      rate:5,
      zipCode: 30003,
      category: [categories[Math.floor(Math.random()*(categories.length))]._id],
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: "Ricky",
      description: "A loving friend ready to help.",
      image: "3-boxer-mix.jpg",
      rate: 8,
      zipCode: 30023,
      category: [categories[Math.floor(Math.random()*(categories.length))]._id],
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: "Danny",
      description: "A loving friend ready to help.",
      image: "4-chihuahua.jpg",
      rate: 10,
      zipCode: 30023,
      category: [categories[Math.floor(Math.random()*(categories.length))]._id],
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },

    {
      name: "Terry",
      description: "A loving friend ready to help.",
      image: "5-english-cocker-spaniel.jpg",
      rate:8,
      zipCode: 30023,
      category: [categories[Math.floor(Math.random()*(categories.length))]._id],
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: "Mikey",
      description: "A loving friend ready to help.",
      image: "6-dog-brown.jpg",
      rate: 10,
      zipCode: 30077,
      category: [categories[Math.floor(Math.random()*(categories.length))]._id],
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: "Davey",
      description: "A loving friend ready to help.",
      image: "7-australian-shepherd.jpg",
      rate: 8,
      zipCode: 30077,
      category: [categories[Math.floor(Math.random()*(categories.length))]._id],
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: "Timmy",
      description: "A loving friend ready to help.",
      image: "8-dog-playful.jpg",
      rate: 10,
      zipCode: 30077,
      category: [categories[Math.floor(Math.random()*(categories.length))]._id],
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: "Tommy",
      description: "A loving friend ready to help.",
      image: "9-doberman.jpg",
      rate: 10,
      zipCode: 30077,
      category: [categories[Math.floor(Math.random()*(categories.length))]._id],
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: "Joey",
      description: "A loving friend ready to help.",
      image: "10-poodle.jpg",
      rate: 10,
      zipCode: 30097,
      category: [categories[Math.floor(Math.random()*(categories.length))]._id],
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: "Robby",
      description: "A loving friend ready to help.",
      image: "11-dog-blackbrownmix.jpg",
      rate: 10,
      zipCode: 30097,
      category: [categories[Math.floor(Math.random()*(categories.length))]._id],
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: "Johnny",
      description: "A loving friend ready to help.",
      image: "12-german-longhaired-pointer.jpg",
      rate: 15,
      zipCode: 30097,
      category: [categories[Math.floor(Math.random()*(categories.length))]._id],
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: "Brian",
      description: "A loving friend ready to help.",
      image: "13-continental-bulldog.jpg",
      rate: 10,
      zipCode: 30097,
      category: [categories[Math.floor(Math.random()*(categories.length))]._id],
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: "Willy",
      description: "A loving friend ready to help.",
      image: "14-dalmatian.jpg",
      rate: 15,
      zipCode: 30026,
      category: [categories[Math.floor(Math.random()*(categories.length))]._id],
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: "Minnie",
      description: "A loving friend ready to help.",
      image: "15-labrador-2.jpg",
      rate: 10,
      zipCode: 30026,
      category: [categories[Math.floor(Math.random()*(categories.length))]._id],
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: "Robin",
      description: "A loving friend ready to help.",
      image: "16-labrador-1.jpg",
      rate: 10,
      zipCode: 30087,
      category: [categories[Math.floor(Math.random()*(categories.length))]._id],
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: "Jan",
      description: "A loving friend ready to help.",
      image: "17-weimaraner.jpg",
      rate: 10,
      zipCode: 30087,
      category: [categories[Math.floor(Math.random()*(categories.length))]._id],
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: "Franky",
      description: "A loving friend ready to help.",
      image: "18-jack-russell.jpg",
      rate: 8,
      zipCode: 30087,
      category: [categories[Math.floor(Math.random()*(categories.length))]._id],
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: "Brady",
      description: "A loving friend ready to help.",
      image: "19-bulldog.jpg",
      rate: 10,
      zipCode: 30087,
      category: [categories[Math.floor(Math.random()*(categories.length))]._id],
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: "Demi",
      description: "A loving friend ready to help.",
      image: "20-australian-shepherd.jpg",
      rate: 10,
      zipCode: 30087,
      category: [categories[Math.floor(Math.random()*(categories.length))]._id],
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
  ]);

  console.log("Dogs seeded");



  process.exit();
});
