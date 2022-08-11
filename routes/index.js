const router = require('express').Router();
const users = require('./users');
const movies = require('./movies');
const ErrorNotFound = require('../errors/ErrorNotFound_404');
const { signup, signin, signout } = require('../controllers/users');
const { signupUser, signinUser } = require('../middlewares/validation');

const auth = require('../middlewares/auth');

router.get('/', (req, res) => res.send({ message: 'Добро пожаловать в приложения  Movies!' }));
router.post('/signup', signupUser, signup);
router.post('/signin', signinUser, signin);

router.use(auth);

router.use('/users', users);
router.use('/movies', movies);
router.post('/signout', signout);

router.use('*', () => {
  throw new ErrorNotFound('Некорректный путь запроса');
});

module.exports = router;
