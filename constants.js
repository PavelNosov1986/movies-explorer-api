const OK_CODE = 201;
const DEFAULT_ERROR_CODE = 500;

const AUTH_ERROR_MESSAGE = 'Неправильные почта или пароль';
const UNAUTHORIZED_ERROR_MESSAGE = 'Необходима авторизация';
const NOT_FOUND_CARD_MESSAGE = 'Передан несуществующий _id карточки фильма.';
const NOT_FOUND_USER_MESSAGE = 'Пользователь по указанному _id не найден.';
const INCORRECT_ERROR_MESSAGE = 'Переданы некорректные данные';
const DEFAULT_ERROR_MESSAGE = 'Ошибка по умолчанию.';
const IMPOSSIBLE_DELETE_CARD = 'Нельзя удалить чужую карточку фильма';
const CARDS_DELETED = 'Карточка фильма удалена';

const allowedCors = [
  '*',
  'http://api.movies.nosovpavel.nomoredomains.work/movies',
  'https://movies.nosovpavel.nomoredomains.work',
  'http://api.movies.nosovpavel.nomoredomains.work',
  'https://localhost:3000',
  'http://localhost:3000',
];
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  OK_CODE,
  DEFAULT_ERROR_CODE,
  NOT_FOUND_CARD_MESSAGE,
  NOT_FOUND_USER_MESSAGE,
  INCORRECT_ERROR_MESSAGE,
  DEFAULT_ERROR_MESSAGE,
  AUTH_ERROR_MESSAGE,
  UNAUTHORIZED_ERROR_MESSAGE,
  allowedCors,
  DEFAULT_ALLOWED_METHODS,
  IMPOSSIBLE_DELETE_CARD,
  CARDS_DELETED,
};
