const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  OK_CODE,
  AUTH_ERROR_MESSAGE,
  NOT_FOUND_USER_MESSAGE,
  INCORRECT_ERROR_MESSAGE,
} = require('../constants');
const {
  IncorrectError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
} = require('../errors/index');

const { NODE_ENV, JWT_SECRET } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findOne({ email, password })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(AUTH_ERROR_MESSAGE);
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError(AUTH_ERROR_MESSAGE);
        }
        return user;
      });
    })
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      return res.send({ token });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((passHash) => User.create({
      name, email, password: passHash,
    })
      .then((newUser) => res.status(OK_CODE).send({
        _id: newUser._id, name, email,
      })))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError('Пользователь с таким email уже зарегистрирован'));
      }
      if (err.name === 'ValidationError') {
        return next(new IncorrectError(`${INCORRECT_ERROR_MESSAGE} при создании пользователя.`));
      }
      return next(err);
    });
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user === null) {
        throw new NotFoundError(NOT_FOUND_USER_MESSAGE);
      }
      return res.send({
        data: user,
      });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new IncorrectError(`${INCORRECT_ERROR_MESSAGE} пользователя.`));
      }
      return next(err);
    });
};

const updateUser = (req, res, next, info) => {
  User.findByIdAndUpdate(req.user._id, info, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (user === null) {
        throw new NotFoundError(NOT_FOUND_USER_MESSAGE);
      }
      return res.send({
        data: user,
      });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new IncorrectError(`${INCORRECT_ERROR_MESSAGE} при обновлении информации.`));
      }
      return next(err);
    });
};

module.exports = {
  login,
  createUser,
  getUserById,
  updateUser,
};
