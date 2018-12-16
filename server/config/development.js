
const db = [
  'getherapp',
  null,
  null,
  {
    dialect: 'sqlite',
    storage: './getherapp.sqlite',
    logging: true, // mark this true if you want to see logs
  },
];
const graphQL = {
  port: 8080,
};
const mock = { populating: true, force: true };
export default { db, graphQL, mock };
