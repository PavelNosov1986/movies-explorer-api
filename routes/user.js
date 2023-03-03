const router = require('express').Router();
const {
  getUserById,
  updateUser,
} = require('../controllers/users');
const celebrates = require('../middlewares/celebrates');

router.get('/me', getUserById);
router.patch('/me', celebrates.updateUser, updateUser);

module.exports = router;
