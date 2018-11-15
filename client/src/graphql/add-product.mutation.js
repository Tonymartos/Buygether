import gql from 'graphql-tag';
import PRODUCT_FRAGMENT from './product.fragment';

const CREATE_PRODUCT_MUTATION = gql`
  mutation createProduct($product: CreateMessageInput!) {
    createProduct(product: $product) {
      ...ProductFragment
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export default CREATE_PRODUCT_MUTATION;
