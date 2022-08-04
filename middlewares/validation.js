const {celebrate, Joi} = require('celebrate');
const validator = require('validator');

const validateURL = (value) => {
    if (!validator.isURL(value, {require_protocol: true})) {
        throw new Error('Неправильный формат ссылки');
    }
    return value;
};

const validUserId = celebrate({
    params: Joi.object().keys({
        userId: Joi.string().alphanum().length(24).hex(),
    }),
});

const validLogin = celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    }),
});

const validUser = celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(30),
        avatar: Joi.string().custom(validateURL),
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

module.exports = {
  movieValid,
  validUserId,
  validLogin,
  validUser,

};
