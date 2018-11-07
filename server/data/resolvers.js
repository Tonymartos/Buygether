import {
  User,
  Group,
  List,
  Product,
} from './connectors';

export const resolvers = {
  Query: {
    user(_, args) {
      return User.findOne({ where: args });
    },
    group(_, args) {
      return Group.findOne({ where: args });
    },
    list(_, args) {
      return List.findOne({ where: args, order: [['createdAt', 'DESC']] });
    },
    product(_, args) {
      return Product.findOne({ where: args, order: [['updatedAt', 'DESC']] });
    },
  },
  Mutation: {
    createProduct(_, {
      name, quantity, price, listId,
    }) {
      return Product.create({
        name,
        quantity,
        price,
        listId,
      }).then;
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
    lists(group) {
      return group.getLists();
    },
  },
  List: {
    products(list) {
      return list.getProducts({ order: [['createdAt', 'DESC']] });
    },
  },
};
export default resolvers;
