const authService = require('../services/auth.service');

const getSignIn = async (req, res, next) => {
  if (req.user) {
    console.log(req.flash('msg'));
    res.redirect('/');
  }
  else {
    res.render(`signIn`, {
      title: 'Sign In',
      which: 'home'
    });
  }
};

const getSignUp = async (req, res, next) => {
  res.render('signUp', { title: 'Sign Up', which: 'home' });
};

const postSignUp = async (req, res, next) => {
  const { name, phone, email, password, confirmPassword, securityQuestion, securityAnswer } = req.body;

  try {
    if (password !== confirmPassword) {
      res.redirect('/signUp');
    }

    const createdUser = await authService.postSignUp(name, phone, email, password, securityQuestion, securityAnswer);

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

const postForgetAccount = async (req, res, next) => {
  const { email, securityQuestion, securityAnswer, newPassword } = req.body;

  try {
    const updatedUser = await authService.postForgetAccount(email, securityQuestion, securityAnswer, newPassword);

    if (updatedUser) {
      req.login(updatedUser, error => {
        if (error) {
          return error;
        }
        res.locals.user = req.user;
      });
      res.redirect('/');
    } else {
      res.redirect('/forgetAccount');
    }
  } catch (e) {
    console.log(e);
    res.redirect('/forgetAccount');
  }
};

const getSignOut = async (req, res, next) => {
  req.logout();
  res.redirect('/');
};

const getRetrieveUser = async (req, res, next) => {
  res.render('viewUser', { title: req.user.name, which: 'contact' });
};

const getUpdateUser = async (req, res, next) => {
  res.render('updateUser', { title: req.user.name, which: 'contact' });
};

const putUpdateUser = async (req, res, next) => {
  const { userId } = req.params;
  const user = await authService.putUpdateUser(req);

  if (user) {
    res.redirect(`/users/${userId}`);
  }
  else {
    res.redirect(`/users/${userId}/update`);
  }
};

module.exports = {
  getSignIn,
  getSignUp,
  postSignUp,
  getForgetAccount,
  postForgetAccount,
  getSignOut,
  getRetrieveUser,
  getUpdateUser,
  putUpdateUser
};