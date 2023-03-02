const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (image) => isUrl(image),
      message: 'Некорректный формат ссылки на картинку фильма',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (link) => isUrl(link),
      message: 'Некорректный формат ссылки на трейлер фильма',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (image) => isUrl(image),
      message: 'Некорректный формат ссылки на мини-картинку фильма',
    },
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
