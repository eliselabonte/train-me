const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Use withAuth middleware to prevent access to route
router.get('/', withAuth, async(req, res) => {
    try {
        // console.log('HEY!!!!!!!!!', req.session.user_id)
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });
        // console.log("USER DATA", userData)
        // need to add in comments

        const user = userData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/create', withAuth, async(req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });
        const user = userData.get({ plain: true });

        res.render('create', {
            ...user,
            logged_in: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/edit/:id', withAuth, async(req, res) => {
    try {
        // Find the logged in user based on the session ID
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User }],
        });
        const post = postData.get({ plain: true });

        res.render('edit', {
            post,
            logged_in: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;