import gql from 'graphql-tag';

const PRODUCT_FRAGMENT = gql`
  fragment ProductFragment on Product {
    id
    name
    quantity
    price
  }
`;

export default PRODUCT_FRAGMENT;
