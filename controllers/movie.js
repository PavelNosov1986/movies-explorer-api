const mongoose = require('mongoose');
const Movie = require('../models/movie');
const {
  OK_CODE,
  NOT_FOUND_CARD_MESSAGE,
  INCORRECT_ERROR_MESSAGE,
} = require('../constants');
const { IncorrectError, ForbiddenError, NotFoundError } = require('../errors/index');

const getMovie = (req, res, next) => {
  Movie.find({})
    .populate(['owner'])
    .then((movie) => res.send({ data: movie }))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const { name, link } = req.body;
  Movie.create({ name, link, owner: req.user._id })
    .then((card) => res.status(OK_CODE).send({ data: card }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new IncorrectError(`${INCORRECT_ERROR_MESSAGE} при создании карточки.`));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(() => new NotFoundError(NOT_FOUND_CARD_MESSAGE))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Нельзя удалить чужую карточку'));
      }
      return movie.remove()
        .then(() => res.send({ message: 'Карточка удалена' }));
    })
    .catch(next);
};

module.exports = {
  getMovie,
  createMovie,
  deleteMovie,
};
