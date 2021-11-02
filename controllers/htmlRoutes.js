const router = require('express').Router();
const path = require('path');

// build route for /exercise
router.get('/exercise', (req, res) =>   {
    res.sendFile(path.join(__dirname, '../public/exercise.html'))
});

// build route for /stats
router.get('/stats', (req, res) =>   {
    res.sendFile(path.join(__dirname, '../public/stats.html'))
});
// look in HW 11 (note taker)

module.exports = router;