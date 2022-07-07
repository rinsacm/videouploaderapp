const { MongoClient } = require("mongodb");
const mongodb_url = "mongodb://localhost:27017";

const state = {
  db: null,
};

module.exports.connect = (done) => {
  if (state.db) return done;
  const dbName = "videoUploads";
  const client = new MongoClient(mongodb_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  client.connect((err) => {
      if(err) return done(err);
      console.log("connected to database successfully...");
      const dbs=client.db(dbName);
      state.db=dbs;
      done();
  });
};

module.exports.get = () => {
  return state.db;
};
