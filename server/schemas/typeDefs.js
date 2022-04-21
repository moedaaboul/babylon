const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type Item {
    _id: ID
    title: String
    description: String
    image: String
    price: Int
    stock: Int
    size: [String]
  }

  type Auth {
    token: String
    user: User
  }
  type Query {
    me: User
    getItems: [Item]
  }

  type Mutation {
    loginUser(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
