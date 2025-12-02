const express = require('express');
const router = express.Router();

const professorController = require('../controllers/ProfessorController');
const auth = require('../middleware/auth'); // arquivo auth.js

router.post('/register', professorController.register);
router.post('/login', professorController.login);

router.get('/', auth, professorController.list);
router.get('/:id', auth, professorController.getById);
router.patch('/:id', auth, professorController.update);
router.delete('/:id', auth, professorController.remove);

module.exports = router;
