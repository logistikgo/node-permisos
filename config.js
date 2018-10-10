module.exports = {
  port: process.env.PORT || 8080,
  // db: process.env.MONGODB || 'mongodb://40.124.41.46:27017/LogistikGO_XD',
  db:
    process.env.MONGODB ||
    "mongodb://admin:R9VdEsuAXRY3@ds131902.mlab.com:31902/logistikgo_xd_demo"
  //   db:
  // process.env.MONGODB ||
  // `mongodb://admin:R9VdEsuAXRY3@ds129233.mlab.com:29233/logistikgo_xd`
};
