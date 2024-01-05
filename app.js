'use strict';

const express = require('express');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const port =  process.env.PORT || 3000;
(async () => {
  const mongoServer = await MongoMemoryServer.create({
    instance: {
      dbName: process.env.DB_NAME,
      auth: false
    }
  });

    await mongoose.connect(mongoServer.getUri(), { dbName: process.env.DB_NAME });
      
})();
// set the view engine to ejs
app.set('view engine', 'ejs');

// routes
app.use('/', require('./routes/profile')());
app.use('/', require('./routes/login')());

// start server
const server = app.listen(port);
