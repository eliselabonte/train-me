const router = require('express').Router();
const mongoose = require('mongoose');
const { Exercise, Workout } = require('../../models');


router.get('/', async(req, res) => {
    try {
        const exercises = await Exercise.findAll({
            include: [{ model: Post }, { model: Comment }]
        });
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/:id', async(req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: [{ model: Post }, { model: Comment }]
        });
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/', async(req, res) => {
    try {

        const { username, email, password } = req.body;

        if (!email || !username || !password) res.status(400).send("Please provide email, username, and password.");

        const userData = await User.create({ email, username, password });

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


router.post('/login', async(req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });
        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            console.log('PASSWORD BAD >:(')
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

// router.post('/login', async(req, res) => {
//     try {
//         const userData = await User.findOne({ where: { email: req.body.email } });

//         if (!userData) {
//             res
//                 .status(400)
//                 .json({ message: 'Incorrect email or password, please try again' });
//             return;
//         }

//         const validPassword = await userData.checkPassword(req.body.password);

//         if (!validPassword) {
//             res
//                 .status(400)
//                 .json({ message: 'Incorrect email or password, please try again' });
//             return;
//         }

//         req.session.save(() => {
//             req.session.user_id = userData.id;
//             req.session.logged_in = true;

//             res.json({ user: userData, message: 'You are now logged in!' });
//         });

//     } catch (err) {
//         res.status(400).json(err);
//     }
// });

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// ,
//               user_id: req.session.user_id
router.delete('/:id', async(req, res) => {
    try {
        const userData = await User.destroy({
            where: {
                id: req.params.id
            },
        });

        if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;