const router = require('express').Router();
const userRouter = require('./user');
const movieRouter = require('./movie');
const { auth } = require('../middlewares/auth');
const notFoundController = require('../controllers/notFoundController');
const { createUser, login } = require('../controllers/users');
const celebrates = require('../middlewares/celebrates');

router.post('/signin', celebrates.login, login);
router.post('/signup', celebrates.createUser, createUser);
router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);
router.use('*', auth, notFoundController);

module.exports = router;
