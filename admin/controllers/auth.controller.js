const getIndex = async (req, res, next) => {
  res.redirect('/signIn');
}

const getSignIn = async (req, res, next) => {
  res.render('signIn', { title: 'Sign In', which: 'home' });
};

const getSignOut = async (req, res, next) => {
  req.logout();
  res.redirect('/');
};

const getRetrieveUser = async (req, res, next) => {
  res.render('user/view', { });
}

module.exports = {
  getIndex,
  getSignIn,
  getSignOut,
  getRetrieveUser
};