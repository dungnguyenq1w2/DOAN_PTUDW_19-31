const passport = require('passport');
const { Strategy } = require('passport-local');

const authService = require('../services/auth.service');

passport.use(new Strategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async (username, password, done) => {
    try {
      const user = await authService.getRetrieveUserByEmail(username);

      if (!user) {
        return done(null, false, { message: 'Incorrect email' });
      }

      const passwordMatch = await user.comparePassword(password);
      if (!passwordMatch) {
        return done(null, false, { message: 'Incorrect password' });
      }

      if (user.state.value === 'inactive') {
        return done(null, false, { message: 'Account is locked' });
      }

      if (user.state.value === 'deleted') {
        return done(null, false, { message: 'Incorrect email' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await authService.getRetrieveUserById(id);

    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;