const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const localStrategy = require('passport-local').Strategy;
const { oauth } = require('./config');
const {userMethods } = require('../src/controllers/auth')
const { userModel } = require('../src/models')
passport.serializeUser((user, done) => {
    console.log('user :', user);
    console.log('serialize user :',user._id);
    done(null, user._id);
});

passport.deserializeUser((_id, done) => {
    console.log('deserialise user :');
    userModel.findById(_id).then((user) => {
        done(null, user);
    });
});


passport.use(new GoogleStrategy({
    clientID: oauth.GOOGLE_CLIENT_ID,
    clientSecret: oauth.GOOGLE_CLIENT_SECRET,
    callbackURL: oauth.GOOGLE_CLIENT_CALLBACK
  },
  function(token, tokenSecret, profile, done) {
    userMethods.OauthCreateUser(profile,done);
  }));

  passport.use(new FacebookStrategy({
    clientID: oauth.FACEBOOK_APP_ID,
    clientSecret: oauth.FACEBOOK_APP_SECRET,
    callbackURL: oauth.FACEBOOK_APP_CALLBACK
  },
  function(accessToken, refreshToken, profile, done) {
    userMethods.OauthCreateUser(profile,done);
  }
));