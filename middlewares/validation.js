const {celebrate, Joi} = require('celebrate');
const validator = require('validator');

const validateURL = (value) => {
    if (!validator.isURL(value, {require_protocol: true})) {
        throw new Error('Неправильный формат ссылки');
    }
    return value;
};

const validUserId = celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30).required(),
        email: Joi.string().email().required(),
    }),
});

const signupUser = celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        name: Joi.string().min(2).max(30).required(),
    }),
});

const signinUser = celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    }),
});

const movieValid = celebrate({
    body: Joi.object().keys({
        country: Joi.string().required(),
        director: Joi.string().required(),
        duration: Joi.number().required(),
        year: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().custom(urlValidator).required(),
        trailerLink: Joi.string().custom(urlValidator).required(),
        thumbnail: Joi.string().custom(urlValidator).required(),
        movieId: Joi.number().required(),
        nameRU: Joi.string().required(),
        nameEN: Joi.string().required(),
    }),
});

const movieId = celebrate({
    params: Joi.object().keys({
        _id: Joi.string().hex().length(24),
    }),
});
module.exports = {
    movieValid,
    validUserId,
    signupUser,
    signinUser,
    movieId

};
