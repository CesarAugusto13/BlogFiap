const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
const authMiddleware = require('../middleware/auth');

router.post('/posts', authMiddleware, PostController.createPost);
router.get('/posts', PostController.getAllPosts); 
router.get('/posts/search', PostController.searchPosts);
router.get('/posts/:id', PostController.getPostById);
router.put('/posts/:id', authMiddleware, PostController.updatePost);
router.delete('/posts/:id', authMiddleware, PostController.deletePost);
router.patch('/posts/:id/curtir', PostController.incrementLike);
router.post('/posts/:id/comentarios', PostController.addComment);

module.exports = router;