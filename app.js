require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');

const { NotFoundError } = require('./errors/index');
const { auth } = require('./middlewares/auth');
const { handleError } = require('./middlewares/errors');
const { cors } = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/diplomMoviedb');

app.use(requestLogger);

app.use(cors);

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

app.use(auth);
app.use('/users', require('./routes/user'));
app.use('/movies', require('./routes/movie'));

app.use((req, res, next) => {
  next(new NotFoundError('404. Такой страницы не существует.'));
});

app.use(errors());
app.use(handleError);
app.use(errorLogger);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

module.exports = { app };
