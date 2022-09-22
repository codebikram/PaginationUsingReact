const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/employeeDB';

const connectToMongoDb = () => {
  mongoose.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log('Connected to MongoDb successfully');
    }
  );
};

module.exports = connectToMongoDb;
