import { gql } from "@apollo/client";

export const QUERY_ITEMS = gql`
  query getItems {
    _id
    title
    description
    image
    price
    stock
    size
  }
`;
