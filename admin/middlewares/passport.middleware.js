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

      if (!user.roles.includes('admin')) {
        return done(null, false, { message: 'No privilege' });
      }

      const passwordMatch = await user.comparePassword(password);
      if (!passwordMatch) {
        return done(null, false, { message: 'Incorrect password' });
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