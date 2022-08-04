const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { movieId, movieValid } = require('../middlewares/validation');

router.route('/')
    .get(getMovies)
    .post(movieValid, createMovie);

router.delete('/:_id', movieId, deleteMovie);

module.exports = router;