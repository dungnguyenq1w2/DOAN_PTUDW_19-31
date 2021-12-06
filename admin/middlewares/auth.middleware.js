const adminMiddleware = async (req, res, next) => {
  if (!req.user) {
    res.redirect('/');
  }
  else {
    next();
  }
};

const guestMiddleware = async (req, res, next) => {
  if (req.user) {
    res.redirect('/signIn');
  }
  else {
    next();
  }
};

module.exports = {
  adminMiddleware,
  guestMiddleware
};