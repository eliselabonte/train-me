const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const authRoutes = require('./authRoutes');
const dashboardRoutes = require('./dashboardRoutes');

router.use('/', homeRoutes);
router.use('/login', authRoutes);
router.use('/dashboard', dashboardRoutes)

module.exports = router;