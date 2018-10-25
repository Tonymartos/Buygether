import Sequelize from 'sequelize';

// initialize our database
const db = new Sequelize('getherapp', null, null, {
  dialect: 'sqlite',
  storage: './getherapp.sqlite',
  logging: false, // mark this true if you want to see logs
});
// define groups
const GroupModel = db.define('group', {
  name: { type: Sequelize.STRING },
});
// define users
const UserModel = db.define('user', {
  email: { type: Sequelize.STRING },
  username: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING },
});
const ListModel = db.define('list', {
  name: { type: Sequelize.STRING },
  state: { type: Sequelize.BOOLEAN },
});
const ProductModel = db.define('product', {
  name: { type: Sequelize.STRING },
  quantity: { type: Sequelize.INTEGER },
  price: { type: Sequelize.FLOAT },
});
// users belong to multiple groups and groups have multiple users
UserModel.belongsToMany(GroupModel, { through: 'GroupUser' });
GroupModel.belongsToMany(UserModel, { through: 'GroupUser' });
// users belong to multiple users as friends
UserModel.belongsToMany(UserModel, { through: 'Friends', as: 'friends' });
// groups have multiple lists, but lists belong only to one group
GroupModel.belongsToMany(ListModel, { through: 'ListGroup' });
ListModel.belongsTo(GroupModel);
// products belong to multiple lists and lists have multiple products
ProductModel.belongsToMany(ListModel, { through: 'ListProduct' });
ListModel.belongsToMany(ProductModel, { through: 'ListProduct' });

const Group = db.models.group;
const User = db.models.user;
const List = db.models.list;
const Product = db.models.product;

export {
  db, Group, User, List, Product,
};
