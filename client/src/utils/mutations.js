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
      stock
      size
    }
  }
`;
