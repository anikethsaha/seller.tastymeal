const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const {userMethods } = require('../src/controllers/auth')

passport.serializeUser((user, done) => {
    console.log('user :', user);
    console.log('serialize user :',user._id);
    done(null, user._id);
});

passport.deserializeUser((_id, done) => {
    console.log('deserialise user :');
    // userModel.findById(_id).then((user) => {
    //     done(null, user);
    // });
});


