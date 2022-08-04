const router = require('express').Router();
const users = require('./users');
const movies = require('./movies');
const ErrorNotFound = require('../errors/ErrorNotFound_404');
const { login, createUser, signout } = require('../controllers/users');
const { signupPattern, signinPattern } = require('../middlewares/validation');
const { PATH_NOT_FOUND_MSG, GREETINGS_MSG } = require('../utils/constants');
const auth = require('../middlewares/auth');

router.get('/', (req, res) => res.send({ message: 'Добро пожаловать в приложения  Movies!' }));
router.post('/signup', signupPattern, signup);
router.post('/signin', signinPattern, signin);

router.use(auth);

router.use('/users', users);
router.use('/movies', movies);
router.post('/signout', signout);

router.use('*', () => {
    throw new NotFoundError(PATH_NOT_FOUND_MSG);
});

module.exports = router;