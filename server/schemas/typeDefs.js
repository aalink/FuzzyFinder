const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String!
  }

  type Dog {
    _id: ID
    name: String!
    description: String
    image: String
    rate: Float!
    zipCode: Int!
    category: [Category]!
    user: User!
    client: [User]
  }

  type Order {
    _id: ID
    purchaseDate: String
    dogs: [Dog]!
    quantity: Int!
  }

  type User {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    userType: String!
    orders: [Order]
    dogs: [Dog]
    earnings: Float
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  input CategoryInput {
    _id: ID
    name: String!
  }

  input OrderInput {
    _id: ID
    purchaseDate: String
    dogs: [DogInput]!
    quantity: Int!
  }

  input UserAddInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    userType: String!
    orders: [OrderInput]
    dogs: [DogInput]
    earnings: Float
  }
  input UserInput {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    userType: String!
    orders: [OrderInput]
    dogs: [DogInput]
    earnings: Float
  }
  input DogAddInput {
    name: String!
    description: String
    image: String
    rate: Float!
    zipCode: Int!
    category: [CategoryInput]!
    user: UserInput!
    client: [UserInput]
  }
  input DogInput {
    _id: ID!
    name: String!
    description: String
    image: String
    rate: Float!
    zipCode: Int!
    category: [CategoryInput]!
    user: UserInput!
    client: [UserInput]
  }

  type Query {
    categories: [Category]
    dogs(category: ID, name: String): [Dog]
    dog(_id: ID!): Dog
    user: User
    order(_id: ID!): Order
    checkout(dogs: [ID]!): Checkout
  }

  type Mutation {
    addUser(userToAdd: UserAddInput): Auth
    addOrder(dogs: [ID]!, quantity:[Int]!): Order
    updateUser(userToUpdate: UserInput): User
    addDog (dogToSave: DogAddInput): Dog
    updateDog(dogToUpdate: DogInput): Dog
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
