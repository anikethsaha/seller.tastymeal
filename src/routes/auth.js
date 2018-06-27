const router = require('express').Router();
const passport = require('passport');
const { sellerMethod } = require('../controllers/auth')

const { check, validationResult,body  } = require('express-validator/check');

// get login page
router.get('/login',sellerMethod.showLogin);
router.post('/login',passport.authenticate('local', {
                                                    successRedirect: '/',
                                                    failureRedirect: '/seller/auth/login',
                                                    failureFlash: true }));
router.get('/logout',sellerMethod.logout);



// local Strategy








// Register
router.get('/register',sellerMethod.showRegistration);
router.post('/register',sellerMethod.register);



module.exports = router;


