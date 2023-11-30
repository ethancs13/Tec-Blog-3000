const seedUserData = require("./userSeeds");
const seedPostData = require("./blogPostSeeds");
const seedCommentData = require("./commentSeeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUserData();
  console.log("--- User Data Seeded Successfully ---")

  await seedPostData();
  console.log("--- Post Data Seeded Successfully ---")

  await seedCommentData();
  console.log("--- Comment Data Seeded Successfully ---")

  console.log("Finished Seeding.")
  process.exit(0);
};

seedAll();