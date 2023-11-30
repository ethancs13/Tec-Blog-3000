const router = require("express").Router();
const { Users } = require("../../models");

// Post route for login
router.post("/login", async (req, res) => {
  try {
    console.log(req.body.name);
    // Looks for valid name where it matches in req.body.name
    const userData = await Users.findOne({
      where: {
        name: req.body.name,
      },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again." });
      return;
    }

    // Checks for valid password matching in userData req.body.password
    const validPassword = await userData.checkPassword(req.body.password);

    console.log(validPassword);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again." });
      return;
    }

    // saves session user_id and logged_in status
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res
        .status(200)
        .json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Post route for logout
router.post("/logout", (req, res) => {
  // Will destroy session after logout
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Post route for signup (/api/users/signup)
router.post("/signup", async (req, res) => {
  try {
    const newUser = await Users.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      // Response is sent inside callback function passed to req.session.save(), and won't be sent until after the session is saved
      res.status(200).json({
        user: newUser,
        message: "You are now signed up and logged in!",
      });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;