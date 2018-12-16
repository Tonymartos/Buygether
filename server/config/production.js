const db = [
  'postgres://pcphnpkl:lSeuwi3DIvNKOd8hejms-FRTIkV_Ry07@manny.db.elephantsql.com:5432/pcphnpkl',
  {
    logging: true, // mark this true if you want to see logs
  },
];
const graphQL = {
  port: 8080,
};
const mock = { populating: false, force: false };
export default { db, graphQL, mock };
