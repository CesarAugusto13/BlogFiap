const express = require('express');
const router = express.Router();
const professorController = require('../controllers/ProfessorController');
const authMiddleware = require('../middlewares/authMiddleware'); // opcional, proteja rotas

router.post('/register', professorController.register);
router.post('/login', professorController.login);

// rotas administrativas (protegidas por token)
router.get('/', /*authMiddleware,*/ professorController.list);
router.get('/:id', /*authMiddleware,*/ professorController.getById);
router.patch('/:id', /*authMiddleware,*/ professorController.update);
router.delete('/:id', /*authMiddleware,*/ professorController.remove);

module.exports = router;
