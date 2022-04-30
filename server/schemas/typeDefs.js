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
    createdAt: String
    description: String
    image: [String]
    price: Float
    discountedPrice: Float
    stock: Int
    brand: String
    colour: String
    category: String
  }

  type Auth {
    token: String
    user: User
  }

  input ItemsFilters {
    maxPrice: Int
    minPrice: Int
    categories: [String]
  }

  input ItemsSort {
    priceAsc: Boolean
    priceDesc: Boolean
    newest: Boolean
  }

  input ItemsInput {
    filter: ItemsFilters
    sort: ItemsSort
  }

  type Query {
    me: User
    items(input: ItemsInput): [Item]!
    brandItems: [Item]
    item(itemId: ID!): Item
  }

  input ItemInput {
    title: String
    description: String
    image: [String]
    price: Float
    discountedPrice: Float
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
