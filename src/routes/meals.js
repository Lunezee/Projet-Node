const express = require('express');
const router = express.Router();
const controller = require('../controllers/mealsController');

router.get('/', controller.getAllMeals);

module.exports = router;
