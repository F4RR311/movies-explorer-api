const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorNotFound = require('../errors/ErrorNotFound_404');
const ErrorConflict = require('../errors/ErrorConflict_409');
const BadRequestError = require('../errors/BadRequestError_400');
const Unauthorized = require('../errors/Unauthorized_401');
const { secretTokenKey } = require('../utils/config');

const { JWT_SECRET, NODE_ENV } = process.env;

// GET /users/me - возвращает информацию о текущем пользователе
module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new ErrorNotFound('Пользователь по _id не найден');
      }
      return res.send(user);
    })
    .catch(next);
};

// PATCH /users/me — обновляет профиль
module.exports.updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new ErrorNotFound('Запрашиваемый пользователь не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

// Регистрация
module.exports.signup = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash })
      .then((user) => {
        const newUser = user.toObject();
        delete newUser.password;
        res.send(newUser);
      }))
    .catch((err) => {
      if (err.name === 'MongoServerError') {
        next(new ErrorConflict('Email уже зарегистрирован'));
      }

      if (err.code === 11000) {
        return next(new ErrorConflict('Пользователь с таким email уже зарегистрирован'));
      }
      return next(err);
    });
};

// Логин
module.exports.signin = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password') // в случае аутентификации хеш пароля нужен
    .then((user) => {
      if (!user) {
        return Promise.reject(new Unauthorized('Неправильные почта или пароль'));
      }
      return Promise.all([bcrypt.compare(password, user.password), user]);
    })
    .then(([isPasswordCorrect, user]) => {
      if (!isPasswordCorrect) {
        return Promise.reject(new Unauthorized('Неправильная почта или пароль'));
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV !== 'production' ? secretTokenKey : JWT_SECRET,
        {
          expiresIn: '7d',
        },
      );

      return res.send({ token });
    })
    .catch(next);
};

module.exports.signout = (req, res, next) => {
  res.localStorage.removeItem('jwt')
    .send({ message: 'Успешный выход' })
    .catch(next);
};
