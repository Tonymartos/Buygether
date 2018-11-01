import gql from 'graphql-tag';
// get the group and all group's lists and users
export const LIST_QUERY = gql`
  query list($id: Int) {
    list(id: $id) {
      id
      name
      products {
        id
        name
        quantity
        price
      }
    }
  }
`;
export default LIST_QUERY;
