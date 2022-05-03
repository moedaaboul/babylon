const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String
    usertype: String
    email: String
    orders: [Order]
  }

  type Item {
    _id: ID
    title: String
    createdAt: String
    description: String
    image: [String]
    price: Float
    featured: Boolean
    discountedPrice: Float
    stock: Int
    brand: String
    colour: String
    category: String
  }

  type Look {
    _id: ID
    influencer: String!
    image: String!
    createdAt: String
    description: String
    items: [Item]
  }

  type Order {
    _id: ID
    purchaseDate: String
    items: [Item]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: String
    user: User
  }

  input ItemsFilters {
    maxPrice: Int
    minPrice: Int
    categories: [String]
    colours: [String]
  }

  input ItemsSort {
    priceAsc: Boolean
    priceDesc: Boolean
    newest: Boolean
    featured: Boolean
  }

  input ItemsInput {
    filter: ItemsFilters
    sort: ItemsSort
  }

  type Query {
    me: User
    items(input: ItemsInput): [Item]!
    looks: [Look]!
    look(lookId: ID!): Look
    brandItems: [Item]
    item(itemId: ID!): Item
    order(_id: ID!): Order
    checkout(items: [ID]!): Checkout
  }

  input ItemInput {
    title: String
    description: String
    image: [String]
    price: Float
    colour: String
    discountedPrice: Float
    stock: Int
    category: String
    featured: String
  }

  type Mutation {
    loginUser(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, usertype: String!): Auth
    addItem(input: ItemInput!): Item
    addOrder(items: [ID]!): Order
    deleteItem(itemId: ID!): Item
    updateItem(input: ItemInput!, itemId: ID!): Item
  }
`;

module.exports = typeDefs;
