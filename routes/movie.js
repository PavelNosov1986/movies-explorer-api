/* eslint-disable import/no-extraneous-dependencies */
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const isUrl = require('validator/lib/isURL');
Joi.objectId = require('joi-objectid')(Joi);

const customValidationUrl = (value, helpers) => {
  if (isUrl(value)) {
    return value;
  }
  return helpers.message('Передана некорректная ссылка');
};

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required().min(2),
      director: Joi.string().required().min(2),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required().min(2),
      image: Joi.string().required().custom(customValidationUrl),
      trailerLink: Joi.string().required().custom(customValidationUrl),
      thumbnail: Joi.string().required().custom(customValidationUrl),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required().min(1),
      nameEN: Joi.string().required().min(1),
    }),
  }),
  createMovie,
);

router.delete(
  '/:_id',
  celebrate({
    params: Joi.object().keys({
      _id: Joi.objectId(),
    }),
  }),
  deleteMovie,
);

module.exports = router;
