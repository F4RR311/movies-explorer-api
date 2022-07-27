const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorNotFound = require('../errors/ErrorNotFound_404');
const ErrorConflict = require('../errors/ErrorConflict_409');
const BadRequestError = require('../errors/BadRequestError_400');


// GET /users/me - возвращает информацию о текущем пользователе
module.exports.getUserMe = (req, res, next) => {
    User.findById(req.user._id)
        .then((user) => {
            if (!user) {
                throw  new ErrorNotFound("Пользователь по _id не найден")
            }
            return res.send(user)
        })
        .catch(next);
}

// PATCH /users/me — обновляет профиль
module.exports.updateUserInfo = (req, res, next) => {
    const {email, name} = req.body;
    const userId = req.user._id
    User.findByIdAndUpdate(userId, {name, email}, {new:true, runValidators:true})
        .then((user)=>{
            if(!user){
                throw new ErrorNotFound('Запрашиваемый пользователь не найден')
            }
            res.send(user)
        })
        .catch((err)=>{
            if (err.name === 'CastError' || err.name === 'ValidationError') {
                next(new BadRequestError('Переданы некорректные данные'));
            } else {
                next(err);
            }
        })
}