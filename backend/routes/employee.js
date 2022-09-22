const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

//routes
router.get('/', async (req, res) => {
  try {
    let { page, limit } = req.query;
    if (!page) {
      page = 1;
    }
    if (!limit) {
      limit = 5;
    }
    let pageNumber = parseInt(page);
    let limitNumber = parseInt(limit);
    const startIndex = (pageNumber - 1) * limitNumber;
    // const endIndex = pageNumber * limitNumber;
    const totalResults = await Employee.countDocuments().exec();
    const resultEmployees = await Employee.find()
      .limit(limitNumber)
      .skip(startIndex)
      .exec();
    res.status(200).json({
      success: true,
      totalResults,
      count: resultEmployees.length,
      employees: resultEmployees,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;
