import {
  User,
  Group,
  List,
  Product,
} from './connectors';
// TODO: poner listas y productos y añadirlos a grupos. poner amigos
export const resolvers = {
  Query: {
    user(_, args) {
      return User.findOne({ where: args });
    },
    group(_, args) {
      return Group.findOne({ where: args });
    },
    list(_, args) {
      return List.findAll({ where: args });
    },
    product(_, args) {
      return Product.findAll({ where: args });
    },
  },
  User: {
    groups(user) {
      return user.getGroups();
    },
    friends(user) {
      return user.getFriends();
    },
  },
  Group: {
    users(group) {
      return group.getUsers();
    },
  },
};
export default resolvers;
