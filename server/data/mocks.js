import R from 'ramda';
import faker from 'faker';
import { db } from './connectors';


// create fake starter data
const GROUPS = 4;
const USERS_PER_GROUP = 5;
const LISTS_PER_GROUP = 3;
const PRODUCTS_PER_LIST = 3;
faker.seed(123); // get consistent data every time we reload app

// you NEED to stare at this code too hard until you are fucking bizco
// it's supposed to fake a bunch of groups, users, lists and products
const mockDB = async ({ populating = true, force = true }) => {
  console.log('creating database....');
  await db.sync({ force });

  // exit now if you don't want to create fake data
  if (!populating) {
    return Promise.resolve(true);
  }

  console.log('populating groups....');
  const groups = await Promise.all(
    R.times(
      () => db.models.group.create({
        name: faker.lorem.words(3),
      }),
      GROUPS,
    ),
  );
  console.log('populating users....');
  const usersInGroups = await Promise.all(
    R.map(async (group) => {
      const users = await Promise.all(
        R.times(async () => {
          const user = await group.createUser({
            email: faker.internet.email(),
            username: faker.internet.userName(),
            password: faker.internet.password(),
          });
          return user;
        }, USERS_PER_GROUP),
      );
      return users;
    }, groups),
  );
  // FIXME: necesita actualizar debido al cambio en la base de datos
  /*
  console.log('populating lists....');
  await Promise.all(
    R.map(async (group) => {
      const lists = await Promise.all(
        R.times(async (n) => {
          const list = await group.createList({
            name: faker.lorem.word(),
            state: !n, // solo está activa la primera lista de cada grupo
          });
          await Promise.all(
            R.times(async () => {
              await list.createProduct({
                name: faker.lorem.word(),
                quantity: Math.ceil(Math.random() * 10),
                price: Math.random() * 10,
              });
            }, PRODUCTS_PER_LIST),
          );
          return list;
        }, LISTS_PER_GROUP),
      );
      return lists;
    }, groups),
  );
*/

  console.log('populating friends....');
  await R.map(
    users => users.map(
      (current, i) => users.map((user, j) => (i !== j ? current.addFriend(user) : false)),
    ),
    usersInGroups,
  );
  console.log('done!');

  return Promise.resolve(true);
};


export default mockDB;
