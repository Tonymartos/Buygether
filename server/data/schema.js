import { gql } from 'apollo-server';

export const typeDefs = gql`
  # declare custom scalars
  scalar Date

  type User {
    id: Int! # unique id for the user
    email: String! # we will also require a unique email per user
    username: String # this is the name we'll show other users
    groups: [Group] # groups the user belongs to
    friends: [User] # user's friends/contacts
  }

  type Group {
    id: Int! # unique id for the group
    name: String # name of the group
    users: [User!]! # users in the group
    lists: [List!]! #buy lists
  }
  type List {
      id: Int! 
      name: String!
      state: Boolean!
      date: Date!
      products: [Product!]!
  }
  type Product {
      id: Int!
      name: String!
      quantity: Int!
      price: Float!
  }

  # query for types
  type Query {

    user(username: String, email: String, id: Int): User

    group(id: Int): Group

    list(id: Int): List

    product(id: Int): Product

  }
  schema {
    query: Query
  }
`;

export default typeDefs;
