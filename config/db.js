const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

async function connectDB () {
  const mongoServer = await MongoMemoryServer.create();

  mongoose.connect(mongoServer.getUri(), { dbName: "booDB" });

  // your code here
};

module.export = connectDB;
