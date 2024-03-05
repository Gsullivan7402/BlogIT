// htmlRoutes.js

const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../middlewares/auth');

// Route to render the homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      loggedIn: req.session.loggedIn 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to render the dashboard page, with authentication
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userPostsData = await Post.findAll({
      where: {
        userId: req.session.userId
      },
      include: [
        {
          model: Comment,
          include: [User],
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const posts = userPostsData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
      posts,
      loggedIn: true, // Ensures the layout knows the user is logged in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to render the login page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the dashboard
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  
  res.render('login');
});

// Route to render the signup page
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect to the dashboard
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
});

module.exports = router;
