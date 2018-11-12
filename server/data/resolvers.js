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
      });
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
      return List.findAll({
        where: { groupId: group.id },
        order: [['createdAt', 'DESC']],
      });
    },
  },
  List: {
    products(list) {
      return Product.findAll({
        where: { listId: list.id },
        order: [['createdAt', 'DESC']],
      });
    },
  },
};
export default resolvers;
