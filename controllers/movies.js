const Movie = require('../models/movie');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const { DATA_NOT_FOUND_MSG, DELETE_FORBIDDEN_MSG, MOVIE_DELETED_MSG } = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  req.body.owner = req.user._id;

  Movie.create(req.body)
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(DATA_NOT_FOUND_MSG);
      }

      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(DELETE_FORBIDDEN_MSG);
      }

      return movie.remove()
        .then(() => res.send({ message: MOVIE_DELETED_MSG }));
    })
    .catch(next);
};
