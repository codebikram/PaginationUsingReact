const fs = require('fs').promises;
const Employee = require('./models/Employee');

// add 25 documents to database
const addDataToDb = async () => {
  let count = await Employee.countDocuments().exec();
  if (count > 0) return;
  const data = await fs.readFile('emp.json');
  const empData = JSON.parse(data);
  await Employee.create(empData);
};
module.exports = addDataToDb;
