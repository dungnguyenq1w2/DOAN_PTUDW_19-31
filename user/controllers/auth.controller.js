const authService = require('../services/auth.service');

const getSignIn = async (req, res, next) => {
  const { wrongPassword } = req.query;

  res.render("signIn", { title: "Sign In", which: 'home', wrongPassword });
};

const getSignUp = async (req, res, next) => {
  res.render("signUp", { title: "Sign Up", which: 'home' });
};

const postSignUp = async (req, res, next) => {
  const { name, phone, email, password, confirmPassword } = req.body;

  const createdUser = await authService.postSignUp(name, phone, email, password);

  if (createdUser) {
    req.login(createdUser, error => {
      if (error) {
        return error;
      }
      res.locals.user = req.user;
    });
    res.redirect('/');
  }
  else {
    req.redirect('/signUp');
  }
};

const getSignOut = async (req, res, next) => {
  req.logout();
  res.redirect('/');
}

module.exports = {
  getSignIn,
  getSignUp,
  postSignUp,
  getSignOut
};