const router = require("express").Router();
const { Posts, Comments, Users } = require("../models");
const withAuth = require("../utils/auth");

// Checks user's session data and if they are logged in
router.get("/", async (req, res) => {
  try {
    // Looks for all Posts and JOIN's it with Comments and Users
    const postData = await Posts.findAll({
      include: [
        {
          model: Users,
          attributes: ["name"],
        },
        {
          model: Comments,
          attributes: ["comment_content"],
        },
      ],
    });

    // maps the data into a new array and displays as plain text
    const posts = postData.map((post) => post.get({ plain: true }));

    // console.log(posts);

    // renders the homepage posts if user is logged in
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get route for login
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// Get route for signup
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

// Get route for dashboard page
// looking specifically for where user_id matches the req.session.user_id
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const postData = await Posts.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: Users,
          attributes: ["name"],
        },
        {
          model: Comments,
          attributes: ["comment_content"],
        },
      ],
    });

    // maps the data into a new array
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("dashboard", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get route for create page
router.get("/create", withAuth, (req, res) => {
  try {
    res.render("create", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for getting specific post id and all comments related to it
router.get("/posts/:id", withAuth, async (req, res) => {
  try {
    const postData = await Posts.findByPk(req.params.id, {
      include: [
        {
          model: Users,
          attributes: ["id", "name"],
        },
      ],
    });

    const commentData = await Comments.findAll({
      where: {
        post_id: req.params.id,
      },
      include: [
        {
          model: Users,
          attributes: ["id", "name"],
        },
      ],
    });

    // If postData doesn't exist, return an error and json message
    if (!postData) {
      return res.status(404).json({ message: "No post found with that id." });
    }

    const post = postData.get({ plain: true });

    console.log(post);

    // Maps all comments to a new array and gets them as plain text to display below post
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    res.render("specificPost", {
      post,
      comments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get route for editing a specific post
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const postData = await Posts.findByPk(req.params.id);
    console.log(postData);

    // Need a check if postData is null/unidentified otherwise get plain object from postData
    if (!postData) {
      return res.status(404).json({ message: "No post found with this id." });
    }

    const post = postData.get({ plain: true });
    console.log(post);

    res.render("edit", {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;