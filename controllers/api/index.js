const router = require('express').Router();
const workoutRoutes = require('./workoutRoutes');
const exerciseRoutes = require('./exerciseRoutes');

router.use('/workouts', workoutRoutes);
router.use('/exercises', exerciseRoutes);

module.exports = router;