const mongoose = require('mongoose');
const Movie = require('../models/movie');
const {
  OK_CODE,
  NOT_FOUND_CARD_MESSAGE,
  INCORRECT_ERROR_MESSAGE,
  IMPOSSIBLE_DELETE_CARD,
  CARDS_DELETED,
} = require('../constants');
const { IncorrectError, ForbiddenError, NotFoundError } = require('../errors/index');

const getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.status(OK_CODE).send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new IncorrectError(`${INCORRECT_ERROR_MESSAGE} при создании карточки фильма.`));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.findById(req.params._id)
    .orFail(() => new NotFoundError(NOT_FOUND_CARD_MESSAGE))
    .then((movie) => {
      if (!movie.owner.equals(owner)) {
        return next(new ForbiddenError(IMPOSSIBLE_DELETE_CARD));
      }
      return movie.remove()
        .then(() => res.send({ message: CARDS_DELETED }));
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
