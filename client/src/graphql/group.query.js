import gql from 'graphql-tag';
// get the group and all group's lists and users
export const GROUP_QUERY = gql`
  query group($id: Int) {
    group(id: $id) {
      id
      name
      users {
        id
        username
      }
      lists {
        id
        name
      }
    }
  }
`;
export default GROUP_QUERY;
