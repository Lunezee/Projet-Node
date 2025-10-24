const express = require('express');
const router = express.Router();

const studentRoutes = require('./students');
const mealRoutes = require('./meals');
const reservationRoutes = require('./reservations');

router.use('/students', studentRoutes);
router.use('/meals', mealRoutes);
router.use('/reservations', reservationRoutes);

module.exports = router;
