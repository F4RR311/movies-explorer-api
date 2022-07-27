const Movie = require('../models/movie')
const BadRequestError = require('../errors/BadRequestError_400');

module.exports.createMovie = (req, res, next) => {
    const {
        country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        nameRU,
        nameEN,
        thumbnail,
        movieId
    } = req.body
    Movie.create({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        nameRU,
        nameEN,
        thumbnail,
        movieId,
        owner: req.user._id,
    })
        .then((movie) => {
            res.send(movie);
        })
        .catch((err) => {
            if (err.name === "ValidationError") {
                return next(new BadRequestError("Введены некорректные данные"));
            }
            return next(err);
        });

}

//# возвращает все сохранённые текущим  пользователем фильмы GET /movies
module.exports.getMovies = (req, res, next) => {
        Movie.findById(req.params._id)
            .then((movies) => res.send(movies))
}