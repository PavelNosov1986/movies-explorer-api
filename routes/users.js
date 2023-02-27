const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUserById,
  updateUser,
} = require('../controllers/users');

router.get('/me', getUserById);

router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required().hex().length(24),
    }),
  }),
  getUserById,
);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUser,
);

module.exports = router;
