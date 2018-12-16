const db = [
  'postgres://user:password@host:port/database',
  {
    logging: true, // mark this true if you want to see logs
  },
];
 const graphQL = {
  port: 8080,
};
 const mock = { populating: false, force: false };
 export default { db, graphQL, mock };
