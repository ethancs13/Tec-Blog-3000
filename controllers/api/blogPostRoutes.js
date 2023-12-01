const router = require("express").Router();
const { Post, Comment, User } = require("../../models");
const withAuth = require("../../utils/auth");

// Checks user's session data and if they are logged in
router.get("/", async (req, res) => {
  try {
    // Looks for all Posts and JOIN's it with Comments and User
    const postData = await Post.findAll({
      include: [
        {
          model: User,
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

    console.log(posts);

    // renders the homepage posts if user is logged in
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for getting specific post id and all comments related to it
router.get("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["id", "name"],
        },
        {
          model: Comment,
          attributes: ["comment_content"],
          include: [
            {
              model: User,
              attributes: ["name"],
            },
          ],
        },
      ],
    });

    const posts = postData.get({ plain: true });

    console.log(posts);

    res.render("specificPost", {
      posts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Post request for creating a new post
router.post("/create", withAuth, async (req, res) => {
  try {
    const newPost = await Posts.create({
      title: req.body.title,
      post_content: req.body.post_content,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Put request for editing a specific post
router.put("/edit/:id", withAuth, async (req, res) => {
  try {
    // Updates title and post_content specifically where id matches req.params.id
    const editPost = await Posts.update(
      {
        title: req.body.title,
        post_content: req.body.post_content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(editPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete route for chosen post
router.delete("/edit/:id", withAuth, async (req, res) => {
  try {
    // Updates title and post_content specifically where id matches req.params.id
    const deletePost = await Posts.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(deletePost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;