const { Posts } = require("../models");

const blogPostData = [
  {
    user_id: 1,
    title: "Post One",
    date_created: "October 13, 2023 20:00:05",
    post_content: "Fantastic Post!",
  },
  {
    user_id: 2,
    title: "Post Two",
    date_created: "December 19, 2022 9:55:20",
    post_content:
      "This post kinda stinks.",
  },
  {
    user_id: 3,
    title: "Post Three",
    date_created: "July 4, 2018 1:01:44",
    post_content: "This post was okay.",
  },
];

const seedPostData = () => Posts.bulkCreate(blogPostData);

module.exports = seedPostData;