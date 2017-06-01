'use strict';

const mongoose = require('mongoose');
const dbName = 'private-equity';

// connect to the database
mongoose.connect(`mongodb://localhost/${dbName}`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {  
  console.log(`Connected to the ${dbName} database`);
});