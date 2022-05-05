import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!, $usertype: String!) {
    addUser(username: $username, email: $email, password: $password, usertype: $usertype) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_ITEM = gql`
  mutation Mutation($input: ItemInput!) {
    addItem(input: $input) {
      _id
      title
      description
      image
      price
      discountedPrice
      stock
    }
  }
`;

export const DELETE_ITEM = gql`
  mutation DeleteItem($itemId: ID!) {
    deleteItem(itemId: $itemId) {
      _id
      title
      description
      image
      price
      discountedPrice
      stock
      brand
    }
  }
`;

export const UPDATE_ITEM = gql`
  mutation Mutation($input: ItemInput!, $itemId: ID!) {
    updateItem(input: $input, itemId: $itemId) {
      _id
      title
      description
      image
      price
      discountedPrice
      stock
      brand
      featured
    }
  }
`;

export const ADD_ORDER = gql`
  mutation AddOrder($items: [ID]!) {
    addOrder(items: $items) {
      _id
      purchaseDate
      items {
        _id
        title
        createdAt
        description
        image
        price
        featured
        discountedPrice
        stock
        brand
        colour
        category
      }
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation addReview($itemId: ID!, $rating: Int!) {
    addReview(itemId: $itemId, rating: $rating) {
      _id
      ratings
      numOfReviews
      reviews {
        _id
        rating
      }
    }
  }
`;
