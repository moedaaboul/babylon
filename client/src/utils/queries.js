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
