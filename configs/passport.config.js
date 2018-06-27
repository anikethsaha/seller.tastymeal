const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {sellerMethod } = require('../src/controllers/auth')
const { sellerModel } = require('../src/models')
passport.serializeUser((seller, done) => {
    console.log('seller :', seller);
    console.log('serialize seller :',seller._id);
    done(null, seller._id);
});

passport.deserializeUser((_id, done) => {
    console.log('deserialise user :');
    sellerModel.findById(_id).then((seller) => {
        done(null, seller);
    });
});
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(username, password, done) {
        sellerMethod.login(username,password,done);
    }
  ));

