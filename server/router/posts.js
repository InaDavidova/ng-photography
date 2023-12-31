const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { postController } = require('../controllers');

// middleware that is specific to this router

router.get('/', postController.getLatestsPosts);
router.get('/my-posts', auth(), postController.getUserPosts);
router.get('/my-likes', auth(), postController.getUserLikedPosts);
router.get('/:postId', postController.getPostById);
router.post('/', auth(), postController.createPost);
router.put('/:postId', auth(), postController.editPost);
router.delete('/:postId', auth(), postController.deletePost);
module.exports = router