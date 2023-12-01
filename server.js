const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");

const sequelize = require("./config/connection");

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Creates instance of handlebars with custom helpers
const hbs = exphbs.create({ helpers });

// Middleware to parse URL encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Shows static files from public folder
app.use(express.static(path.join(__dirname, "public")));

// Session middleware
const sess = {
  secret: "secrettttt",
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Use the above middleware in express
app.use(session(sess));

// Sets handlebars as viewing engine
app.engine("handlebars", hbs.engine);
// Default view engine is set to handlebars
app.set("view engine", "handlebars");

// use routes from controllers folder
app.use(routes);

// Sync the sequelize models to database, won't drop or recreate tables if they exist already
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Server listening on http://localhost:${PORT}`)
  );
});