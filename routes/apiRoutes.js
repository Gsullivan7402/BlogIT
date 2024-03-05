// apiRoutes.js

const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../models');
const bcrypt = require('bcrypt');
const withAuth = require('../middlewares/auth');

// User signup
router.post('/users/signup', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// User login
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.json({ user: user, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// User logout
router.post('/users/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Create a new blog post
router.post('/posts', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      userId: req.session.userId,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Post a comment
router.post('/comments', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      userId: req.session.userId,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
