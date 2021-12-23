const authService = require('../services/auth.service');

const getSignIn = async (req, res, next) => {
  if (req.user) {
    res.redirect('/');
  }
  else {
    res.render('signIn', {
      title: 'Sign In',
      which: 'home'
    });
  }
};

const getSignUp = async (req, res, next) => {
  res.render('signUp', { title: 'Sign Up', which: 'home' });
};

const postSignUp = async (req, res, next) => {
  const { name, phone, email, password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      res.redirect('/signUp?passwordsNotMatch');
    }

    const createdUser = await authService.postSignUp(name, phone, email, password);

    if (createdUser) {
      req.login(createdUser, error => {
        if (error) {
          return error;
        }
        res.locals.user = req.user;
      });
      res.redirect('/');
    } else {
      res.redirect('/signUp');
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getForgetAccount = async (req, res, next) => {
  res.render('forgetAccount', { title: 'Forget Account', which: 'home' });
}

const getSignOut = async (req, res, next) => {
  req.logout();
  res.redirect('/');
};

const getRetrieveUser = async (req, res, next) => {
  res.render('viewUser', { title: req.user.name, which: 'contact' });
};

const getUpdateUser = async (req, res, next) => {
  res.render('updateUser', { title: req.user.name, which: 'contact' });
}

const putUpdateUser = async (req, res, next) => {
  const { userId } = req.params;
  const user = await authService.putUpdateUser(req);

  if (user) {
    res.redirect(`/users/${userId}`);
  }
  else {
    res.redirect(`/users/${userId}/update`);
  }
}

module.exports = {
  getSignIn,
  getSignUp,
  postSignUp,
  getForgetAccount,
  getSignOut,
  getRetrieveUser,
  getUpdateUser,
  putUpdateUser
};