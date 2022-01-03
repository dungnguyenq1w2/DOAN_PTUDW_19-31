const passport = require("passport");
const { Strategy } = require("passport-local");

const authService = require("../services/auth.service");

passport.use(
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user = await authService.getRetrieveUserByEmail(username);

        if (!user) {
          const result = { message: "Incorrect email" };
          console.log(result.message);
          return done(null, false, result);
        }

        if (!user.roles.includes("admin")) {
          const result = { message: "No privilege" };
          console.log(result.message);
          return done(null, false, result);
        }

        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) {
          const result = { message: "Incorrect password" };
          console.log(result);
          return done(null, false, result);
        }

        return done(null, user);
      } catch (error) {
        console.log(error);
        return done(error);
      }
    }
  )
);

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
