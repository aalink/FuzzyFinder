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
console.log(userIds);
  await Dog.deleteMany();

  const Dogs = await Dog.insertMany([
    {
      name: "Luna",
      description: "Hi, I'm Luna, a 2-year-old black labrador. I'm professionally trained as a guide dog, I have great memory, pay attention to the surroundings. I'm willing to learn your environment and help you concentrate. I'm also a sweet, playful girl, love playing gently with seniors or kids. If you're looking for a smart, gentle guide dog for a few days, please request for me! Just follow the directions below. After you turn in your application, my owner will contact you to set up an appointment to meet. ",
      image: "dog01.jpg",
      categories: categories[0]._id,
      rate:5,
      zipCode: 30004,
      user: userIds[0]._id
    },])
  //   {
  //     name: "Pepper",
  //     categories: categories[2]._id,
  //     description: "A loving friend ready to help.",
  //     image: "1-dog-black-and-white.jpg",
  //     rate: 8,
  //     zipCode: 30005,
  //   },
  //   // {
  //   //   name: "Scout",
  //   //   categories: categories[1]._id,
  //   //   description: "A loving friend ready to help.",
  //   //   image: "dog03.jpg",
  //   //   rate:5,
  //   //   zipCode: 30005,
  //   // },
  //   {
  //     name: "Marley",
  //     categories: categories[1]._id,
  //     description: "A loving friend ready to help.",
  //     image: "dog04.jpg",
  //     rate:8,
  //     zipCode: 30009,
  //   },
  //   {
  //     name: "Tank",
  //     categories: categories[1]._id,
  //     description: "A loving friend ready to help.",
  //     image: "dog05.jpg",
  //     rate: 5,
  //     zipCode: 30022,
  //   },
  //   // {
  //   //   name: "Cooper",
  //   //   categories: categories[2]._id,
  //   //   description: "A loving friend ready to help.",
  //   //   image: "dog06.jpg",
  //   //   rate: 10,
  //   //   zipCode: 30024,
  //   // },
  //   {
  //     name: "Marky",
  //     categories: categories[2]._id,
  //     description: "A loving friend ready to help.",
  //     image: "2-dog-mikey-mouse-ears.jpg",
  //     rate: 10,
  //     zipCode: 30008,
  //   },
  //   {
  //     name: "Penny",
  //     description: "A loving friend ready to help.",
  //     image: "dog02.jpg",
  //     categories: categories[0]._id,
  //     rate:5,
  //     zipCode: 30003,
  //   },
  //   {
  //     name: "Ricky",
  //     categories: categories[2]._id,
  //     description: "A loving friend ready to help.",
  //     image: "3-boxer-mix.jpg",
  //     rate: 8,
  //     zipCode: 30023,
  //   },
  //   {
  //     name: "Danny",
  //     categories: categories[2]._id,
  //     description: "A loving friend ready to help.",
  //     image: "4-chihuahua.jpg",
  //     rate: 10,
  //     zipCode: 30023,
  //   },

  //   {
  //     name: "Terry",
  //     categories: categories[2]._id,
  //     description: "A loving friend ready to help.",
  //     image: "5-english-cocker-spaniel.jpg",
  //     rate:8,
  //     zipCode: 30023,
  //   },
  //   {
  //     name: "Mikey",
  //     categories: categories[2]._id,
  //     description: "A loving friend ready to help.",
  //     image: "6-dog-brown.jpg",
  //     rate: 10,
  //     zipCode: 30077,
  //   },
  //   {
  //     name: "Davey",
  //     categories: categories[2]._id,
  //     description: "A loving friend ready to help.",
  //     image: "7-australian-shepherd.jpg",
  //     rate: 8,
  //     zipCode: 30077,
  //   },
  //   {
  //     name: "Timmy",
  //     categories: categories[2]._id,
  //     description: "A loving friend ready to help.",
  //     image: "8-dog-playful.jpg",
  //     rate: 10,
  //     zipCode: 30077,
  //   },
  //   {
  //     name: "Tommy",
  //     categories: categories[2]._id,
  //     description: "A loving friend ready to help.",
  //     image: "9-doberman.jpg",
  //     rate: 10,
  //     zipCode: 30077,
  //   },
  //   {
  //     name: "Joey",
  //     categories: categories[2]._id,
  //     description: "A loving friend ready to help.",
  //     image: "10-poodle.jpg",
  //     rate: 10,
  //     zipCode: 30097,
  //   },
  //   {
  //     name: "Robby",
  //     categories: categories[2]._id,
  //     description: "A loving friend ready to help.",
  //     image: "11-dog-blackbrownmix.jpg",
  //     rate: 10,
  //     zipCode: 30097,
  //   },
  //   {
  //     name: "Johnny",
  //     categories: categories[2]._id,
  //     description: "A loving friend ready to help.",
  //     image: "12-german-longhaired-pointer.jpg",
  //     rate: 15,
  //     zipCode: 30097,
  //   },
  //   {
  //     name: "Brian",
  //     categories: categories[2]._id,
  //     description: "A loving friend ready to help.",
  //     image: "13-continental-bulldog.jpg",
  //     rate: 10,
  //     zipCode: 30097,
  //   },
  //   {
  //     name: "Willy",
  //     categories: categories[2]._id,
  //     description: "A loving friend ready to help.",
  //     image: "14-dalmatian.jpg",
  //     rate: 15,
  //     zipCode: 30026,
  //   },
  //   {
  //     name: "Minnie",
  //     categories: categories[2]._id,
  //     description: "A loving friend ready to help.",
  //     image: "15-labrador-2.jpg",
  //     rate: 10,
  //     zipCode: 30026,
  //   },
  //   {
  //     name: "Robin",
  //     categories: categories[2]._id,
  //     description: "A loving friend ready to help.",
  //     image: "16-labrador-1.jpg",
  //     rate: 10,
  //     zipCode: 30087,
  //   },
  //   {
  //     name: "Jan",
  //     categories: categories[2]._id,
  //     description: "A loving friend ready to help.",
  //     image: "17-weimaraner.jpg",
  //     rate: 10,
  //     zipCode: 30087,
  //   },
  //   {
  //     name: "Franky",
  //     categories: categories[2]._id,
  //     description: "A loving friend ready to help.",
  //     image: "18-jack-russell.jpg",
  //     rate: 8,
  //     zipCode: 30087,
  //   },
  //   {
  //     name: "Brady",
  //     categories: categories[2]._id,
  //     description: "A loving friend ready to help.",
  //     image: "19-bulldog.jpg",
  //     rate: 10,
  //     zipCode: 30087,
  //   },
  //   {
  //     name: "Demi",
  //     categories: categories[2]._id,
  //     description: "A loving friend ready to help.",
  //     image: "20-australian-shepherd.jpg",
  //     rate: 10,
  //     zipCode: 30087,
  //   },
  // ]);

  // console.log("Dogs seeded");



  process.exit();
});
