const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const connectToMongoDb = require('./db');
const addDataToDb = require('./AddData');

// json middleware
app.use(express.json());
//for call the api from other port
app.use(cors());

//mongoDb connection
connectToMongoDb();
//adding some data to mongodb
addDataToDb();

app.use('/employees', require('./routes/employee'));

// server listening on a port
app.listen(port, () => {
  console.log(`App is listening on port http://localhost:${port}`);
});
