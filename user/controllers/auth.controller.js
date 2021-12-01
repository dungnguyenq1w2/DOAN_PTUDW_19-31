const authService = require('../services/auth.service');

const getSignIn = async (req, res, next) => {
  res.render("signIn", { title: "Sign In", which: 'home' });
};

const getSignUp = async (req, res, next) => {
  res.render("signUp", { title: "Sign Up", which: 'home' });
};

const postSignUp = async (req, res, next) => {

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