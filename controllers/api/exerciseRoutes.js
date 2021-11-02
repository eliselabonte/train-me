const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async(req, res) => {
    try {
        const posts = await Post.findAll({
            include: [{ model: Comment }, { model: User }]
        });
        res.status(200).json(posts);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/:id', async(req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, {
            include: [{ model: User }, { model: Comment }]
        });
        res.status(200).json(post);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/', withAuth, async(req, res) => {
    try {
        const { title, post_body, user_id } = req.body;
        const newPost = await Post.create({ title, post_body, user_id: req.session.user_id });

        res.status(200).json(newPost);

    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', withAuth, async(req, res) => {
    Post.update(
            req.body, {
                where: { id: req.params.id }
            })
        .then((post) => res.status(200).json(post))
        .catch((err) => {
            console.error(err);
            res.status(500).json(err.toString())
        })
});

router.delete('/:id', withAuth, async(req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;