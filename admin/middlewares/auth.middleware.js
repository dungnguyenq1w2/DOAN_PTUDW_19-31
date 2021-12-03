const authMiddleware = async (req, res, next) => {
  if (!req.user) {
    res.redirect('/');
  }
  else {
    next();
  }
}

const guestMiddleware = async (req, res, next) => {
  if (req.user) {
    res.redirect('/');
  }
  else {
    next();
  }
}

module.exports = {
  authMiddleware,
  guestMiddleware
};