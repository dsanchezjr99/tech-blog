const router = require('express').Router();

const userRoutes = require('./user-r');
const postRoutes = require('./post-r');
const commentRoutes = require('./com-routes');

//router routes

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;