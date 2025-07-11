const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');

router.post('/posts', PostController.createPost);
router.get('/posts', PostController.getAllPosts); 
router.get('/posts/search', PostController.searchPosts);
router.get('/posts/:id', PostController.getPostById);
router.put('/posts/:id', PostController.updatePost);
router.delete('/posts/:id', PostController.deletePost);

module.exports = router;