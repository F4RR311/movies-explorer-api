const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ConflictError = require('../errors/ConflictError');
const User = require('../models/user');
const {secretTokenKey, jwtSettings, cookieSettings} = require('../utils/config');
const {SIGNIN_MSG, SIGNOUT_MSG, EMAIL_EXIST_MSG} = require('../utils/constants');

const {JWT_SECRET, NODE_ENV} = process.env;

// module.exports.getUser = async (req, res, next) => {
//   User.findById(req.user._id)
//     .then((user) => res.send(user))
//     .catch(next);
// };

module.exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) throw new NotFoundError(DEFAUTL_MSG);
    res.send(user);
  } catch (e) {
    next(e);
  }
};
module.exports.updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    req.body,
    {new: true, runValidators: true},
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'MongoServerError') {
        next(new ConflictError(EMAIL_EXIST_MSG));
      } else {
        next(err);
      }
    });
};

module.exports.signup = (req, res, next) => {
  const {name, email, password} = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({name, email, password: hash})
      .then((user) => {
        const newUser = user.toObject();
        delete newUser.password;
        res.send(newUser);
      }))
    .catch((err) => {
      if (err.name === 'MongoServerError') {
        next(new ConflictError(EMAIL_EXIST_MSG));
      } else {
        next(err);
      }
    });
};

module.exports.signin = (req, res, next) => {
  const {email, password} = req.body;
  User.findUserByCredentials({email, password})
    .then((user) => {
      const token = jwt.sign(
        {_id: user._id},
        NODE_ENV !== 'production' ? secretTokenKey : JWT_SECRET,
        jwtSettings,
      );

        res
        .cookie('jwt', token, cookieSettings)
        .send({message: SIGNIN_MSG});
    })
    .catch(next);
};

module.exports.signout = (req, res, next) => {
  res
    .clearCookie('jwt')
    .send({message: SIGNOUT_MSG})
    .catch(next);
};
