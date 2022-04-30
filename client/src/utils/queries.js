import { gql } from '@apollo/client';

export const QUERY_ITEMS = gql`
  query Items($input: ItemsInput) {
    items(input: $input) {
      _id
      title
      description
      image
      price
<<<<<<< HEAD
      salePrice
      stock
      size
      colour
=======
      discountedPrice
      stock
      brand
>>>>>>> a8e2ac2426fd6dadb41ef855dc0914f909d8093b
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
