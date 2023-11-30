const { Comments } = require("../models");

const commentData = [
  {
    date_created: "January 21, 2023 10:10:01",
    comment_content: "This was a really great post!",
    user_id: 2,
    post_id: 1,
  },
  {
    date_created: "December 20, 2013 6:25:00",
    comment_content:
      "I didn't find this post to be that useful.",
    user_id: 1,
    post_id: 2,
  },
  {
    date_created: "March 6, 2023 22:40:12",
    comment_content:
      "This post contained a lot of relevant information and I enjoyed it!",
    user_id: 3,
    post_id: 2,
  },
];

const seedCommentData = () => Comments.bulkCreate(commentData);

module.exports = seedCommentData;