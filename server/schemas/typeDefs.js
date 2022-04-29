const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String
    usertype: String
    email: String
  }

  type Item {
    _id: ID
    title: String
    description: String
    image: [String]
    price: Int
    salePrice: Int
    stock: Int
    size: [String]
    brand: String
    colour: String
  }

  type Auth {
    token: String
    user: User
  }
  type Query {
    me: User
    items: [Item]!
    brandItems: [Item]
  }

  input ItemInput {
    title: String
    description: String
    image: [String]
    price: Int
    stock: Int
    size: [String]
  }

  type Mutation {
    loginUser(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, usertype: String!): Auth
    addItem(input: ItemInput!): Item
    deleteItem(itemId: ID!): Item
    updateItem(input: ItemInput!, itemId: ID!): Item
  }
`;

module.exports = typeDefs;
