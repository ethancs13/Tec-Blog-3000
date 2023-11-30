// Custom middleware that will only allow you to view pages if logged in, otherwise redirects to login page
const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
      res.redirect("/login");
    } else {
      next();
    }
  };
  
  module.exports = withAuth;