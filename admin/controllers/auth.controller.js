const getIndex = async (req, res, next) => {
  if (req.user) {
    res.redirect('/cakes');
  }
  else {
    res.redirect('/signIn');
  }
}

const getSignIn = async (req, res, next) => {
  res.render('signIn', { title: 'Sign In', which: 'home' });
};

const getSignOut = async (req, res, next) => {
  req.logout();
  res.redirect('/');
};

const getRetrieveUser = async (req, res, next) => {
  res.render('viewProfile', { title: 'Profile', which: 'home' });
}

module.exports = {
  getIndex,
  getSignIn,
  getSignOut,
  getRetrieveUser
};