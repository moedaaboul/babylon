import { gql } from '@apollo/client';

export const QUERY_ITEMS = gql`
  query allitems {
    items {
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

export const GET_BRAND_ITEMS = gql`
  query Query {
    brandItems {
      _id
      title
      description
      price
      stock
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
      stock
      brand
      size
    }
  }
`;
