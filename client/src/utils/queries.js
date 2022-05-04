import { gql } from '@apollo/client';

export const QUERY_ITEMS = gql`
  query Items($input: ItemsInput) {
    items(input: $input) {
      _id
      title
      description
      image
      price
      colour
      discountedPrice
      stock
      brand
      featured
    }
  }
`;

export const GET_BRAND_ITEMS = gql`
  query Query {
    brandItems {
      _id
      title
      description
      price
      discountedPrice
      stock
      featured
    }
  }
`;

export const GET_HISTORY_ORDERS = gql`
  query Query {
    orderHistory {
      _id
      username
      usertype
      email
      orders {
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
  }
`;

export const GET_SINGLE_ITEM = gql`
  query getSingleItem($itemId: ID!) {
    item(itemId: $itemId) {
      _id
      title
      image
      description
      price
      discountedPrice
      stock
      brand
      category
    }
  }
`;

export const QUERY_LOOKS = gql`
  query looks {
    looks {
      _id
      influencer
      image
      description
      createdAt
      items {
        _id
        description
        image
        price
        discountedPrice
        title
      }
    }
  }
`;

export const GET_SINGLE_LOOK = gql`
  query Query($lookId: ID!) {
    look(lookId: $lookId) {
      _id
      influencer
      image
      createdAt
      description
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

export const QUERY_CHECKOUT = gql`
  query getCheckout($items: [ID]!) {
    checkout(items: $items) {
      session
    }
  }
`;
