const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async(req, res) => {
    try {
        // Get all posts and JOIN with user data
        const postData = await Post.findAll({
            include: [{
                model: User,
                attributes: ['username'],
            }],
        });
        const commentData = await Comment.findAll();

        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));
        const comments = commentData.map((comment) => comment.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('homepage', {
            posts,
            comments,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/posts/:id', async(req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{
                model: User,
                attributes: ['username'],
            }, ],
        });

        if (postData) {

            const commentData = await Comment.findAll({
                where: { 'post_id': req.params.id },
                include: [{
                    model: User,
                    attributes: ['username']
                }, ],
            });

            const post = postData.get({ plain: true });
            const comments = commentData.map((comment) => comment.get({ plain: true }));
            const currentUser = req.session.user_id;

            const belongsToUser = () => {
                const postUser = post.user_id;
                if (currentUser === postUser) {
                    return true;
                } else {
                    return false;
                }
            }

            res.render('post', {
                post,
                comments,
                belongsToUser,
                currentUser,
                logged_in: req.session.logged_in
            });
        } else {
            res.render('404')
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

module.exports = router;