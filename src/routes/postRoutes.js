const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');

// Mapeando cada rota para uma função do controlador
router.post('/posts', PostController.createPost);
router.get('/posts', PostController.getAllPosts); // Lista para alunos e professores
router.get('/posts/search', PostController.searchPosts); // Importante: esta rota deve vir ANTES de /posts/:id
router.get('/posts/:id', PostController.getPostById);
router.put('/posts/:id', PostController.updatePost);
router.delete('/posts/:id', PostController.deletePost);

module.exports = router;