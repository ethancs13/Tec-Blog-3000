const router = require("express").Router();
const { Posts, Comments, Users } = require("../../models");
const withAuth = require("../../utils/auth");

// Post request for creating a new comment
router.post("/", withAuth, async (req, res) => {
  try {
    const newComment = await Comments.create({
      comment_content: req.body.comment_content,
      date_created: req.body.date_created,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    });
    console.log(newComment);
    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// // Put request for editing a comment
// router.put("/:id", withAuth, async (req, res) => {
//   try {
//     const editComment = await Comments.update(
//       {
//         comment_content: req.body.comment_content,
//       },
//       {
//         where: {
//           id: req.params.id,
//         },
//       }
//     );
//     res.status(200).json(editComment);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Delete route for chosen comment
// router.delete("/:id", withAuth, async (req, res) => {
//   try {
//     const deleteComment = await Comments.destroy({
//       where: {
//         id: req.params.id,
//       },
//     });
//     res.status(200).json(deleteComment);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;