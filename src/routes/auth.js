const router = require('express').Router();
const passport = require('passport');
const { userMethods } = require('../controllers/auth')

const { check, validationResult,body  } = require('express-validator/check');

// get login page
router.get('/login',userMethods.showLogin);
router.post('/login',passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true }));
router.get('/logout',userMethods.logout);

// google
router.get('/google', passport.authenticate('google', {scope: ['profile']}));
router.get('/google/callback',passport.authenticate('google'),userMethods.oauthCallback);



// facebook
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback',passport.authenticate('facebook', { failureRedirect: '/login' }),userMethods.oauthCallback);


// local Strategy








// Register
router.get('/register',userMethods.showRegistration);
router.post('/register',userMethods.register);



module.exports = router;


