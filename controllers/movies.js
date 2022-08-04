const Movie = require('../models/movie')

const ErrorNotFound = require("../errors/ErrorNotFound_404");
const Forbidden = require("../errors/Forbidden_403");

module.exports.createMovie = (req, res, next) => {
    req.body.owner = req.user._id;

    movieModel.create(req.body)
        .then((movie) => res.send(movie))
        .catch(next);
};


//# возвращает все сохранённые текущим  пользователем фильмы GET /movies
module.exports.getMovies = (req, res, next) => {
    Movie.findById(req.params._id)
        .then((movie) => {
            if (!movie) {
                throw new ErrorNotFound;
            }

            if (movie.owner.toString() !== req.user._id) {
                throw new Forbidden;
            }

            return movieModel.findByIdAndDelete(movie._id)
                .then((deleted) => res.send(deleted));
        })
        .catch(next);
}