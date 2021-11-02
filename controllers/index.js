const router = require('express').Router();

const apiRoutes = require('./api');
const HTML = require('./HTML');

router.use('/', HTML);
router.use('/api', apiRoutes);

module.exports = router;