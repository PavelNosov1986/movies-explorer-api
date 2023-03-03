const router = require('express').Router();
const celebrates = require('../middlewares/celebrates');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', celebrates.createMovie, createMovie);
router.delete('/:_id', celebrates.checkIdMovie, deleteMovie);

module.exports = router;
