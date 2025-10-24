const express = require('express');
const router = express.Router();
const controller = require('../controllers/studentsController');

router.post('/', controller.createStudent);
router.get('/:id', controller.getStudentById);
router.put('/:id', controller.updateMealBalance);
router.get('/', controller.getAllStudents);

module.exports = router;
