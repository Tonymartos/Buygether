import gql from 'graphql-tag';
import PRODUCT_FRAGMENT from './product.fragment';

export const LIST_QUERY = gql`
  query list($id: Int) {
    list(id: $id) {
      id
      name
      products {
        ...ProductFragment
      }
    }
  }
${PRODUCT_FRAGMENT}
`;
export default LIST_QUERY;
