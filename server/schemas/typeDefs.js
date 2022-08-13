const { gql } = require('apollo-server-express');
const {
  GraphQLUpload,
  graphqlUploadExpress, // A Koa implementation is also exported.
} = require('graphql-upload');

const typeDefs = gql`
  scalar Upload

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
    category: Category!
    user: User!
    client: [User]
  }

  type DogOwner {
    _id: ID
    owner: User
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
    category: ID!
    user: UserInput
    client: [UserInput]
  }
  input DogInput {
    _id: ID!
    name: String!
    description: String
    image: String
    rate: Float!
    zipCode: Int!
    category: ID!
    user: UserInput!
    client: [UserInput]
  }

  type S3Object {
    ETag: String
    Location: String!
    Key: String!
    Bucket: String!
  }

  type Query {
    categories: [Category]
    category(categoryName: String!): Category
    dogs(category: ID, name: String): [Dog]
    dog(_id: ID!): Dog
    user: User
    order(_id: ID!): Order
    checkout(dogs: [ID]!): Checkout
  }

  type Mutation {
    addUser(userToAdd: UserAddInput!, dogToAdd: DogAddInput): Auth
    addOrder(dogs: [ID]!, quantity:[Int]!): Order
    updateUser(userToUpdate: UserInput): User
    addDog (dogToSave: DogAddInput): Dog
    updateDog(dogToUpdate: DogInput): Dog
    login(email: String!, password: String!): Auth
    uploadFile(file: Upload!): S3Object
  }
`;

module.exports = typeDefs;