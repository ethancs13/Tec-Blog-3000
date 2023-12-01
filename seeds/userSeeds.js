const { User } = require("../models");

const userData = [
  {
    name: "Brian Anderson",
    email: "brian@gmail.com",
    password: "asdfasdf",
  },
  {
    name: "Richard Larry",
    email: "richlarry@gmail.com",
    password: "12341234",
  },
  {
    name: "Annie Brown",
    email: "annie@gmail.com",
    password: "Password",
  },
];

const seedUserData = () => User.bulkCreate(userData);

module.exports = seedUserData;