const { NotFoundError } = require('../errors/index');

const notFoundController = (req, res, next) => {
  next(new NotFoundError('404. Такой страницы не существует.'));
};

module.exports = notFoundController;
