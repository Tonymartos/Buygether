import faker from 'faker';

export const mocks = {
  Date: () => new Date(),
  Int: () => parseInt(Math.random() * 100, 10),
  String: () => 'It works!',
  User: () => ({
    email: faker.internet.exampleEmail(),
    username: faker.internet.userName(),
  }),
  Group: () => ({
    name: faker.lorem.words(Math.random() * 3),
  }),
  List: () => ({
    name: faker.lorem.words(Math.random() * 5),
  }),
  Product: () => ({
    name: faker.lorem.words(Math.random() * 2),
  }),
};

export default mocks;
