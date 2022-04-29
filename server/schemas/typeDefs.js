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
    stock: Int
    brand: String
    category: String
  }

  type Auth {
    token: String
    user: User
  }

  input ItemsFilters {
    maxPrice: Int
    minPrice: Int
  }

  input ItemsSort {
    priceAsc: Boolean
    priceDesc: Boolean
  }

  input ItemsInput {
    filter: ItemsFilters
    sort: ItemsSort
  }

  type Query {
    me: User
    items(input: ItemsInput): [Item]!
    brandItems: [Item]
  }

  input ItemInput {
    title: String
    description: String
    image: [String]
    price: Int
    stock: Int
    category: String
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
