const express = require('express');
const router = express.Router();
const professorController = require('../controllers/ProfessorController');


router.post('/register', professorController.register);
router.post('/login', professorController.login);

module.exports = router;
