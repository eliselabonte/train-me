const router = require('express').Router();
const path = require('path');
const { Workout } = require('../models');

// get request for api/workouts
router.get('/api/workouts', async (req, res) =>    {
    try{
        const workouts = await Workout.find({});
        res.json(workouts)
    }
    catch(err) {
        res.status(500).json(err)
    }
});

// get request for /api/workouts/range (limit/sort for last 7)
router.get('/api/workouts/range', async (req, res) =>    {
    try{
        const workouts = await Workout.find({});
        res.json(workouts)
    }
    catch(err) {
        res.status(500).json(err)
    }
});

// put request for api/workouts/:id
router.put('/api/workouts/:id', async (req, res) =>    {
    try{
        const workout = await Workout.updateOne({ id:req.params.id })
        .where({ day: req.body.day}, {exercises: req.body.exercises});
        res.json(workout)
    }
    catch(err) {
        res.status(500).json(err)
    }
});

// post request for api/workouts
router.post('/api/workouts/', async (req, res) =>    {
    try{
        const newWorkout = await Workout.updateOne(
            { day: req.body.day }, { exercises: req.body.exercises }, function(err, res) {

            })
        res.json(newWorkout)
    }
    catch(err) {
        res.status(500).json(err)
    }
});

module.exports = router;