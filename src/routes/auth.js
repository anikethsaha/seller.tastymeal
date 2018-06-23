const router = require('express').Router();
const passport = require('passport');
const { userMethods } = require('../controllers/auth')

const { check, validationResult,body  } = require('express-validator/check');

// get login page
router.get('/login',userMethods.showLogin);

router.get('/logout',userMethods.logout);

// google
router.get('/google', passport.authenticate('google', {scope: ['profile']}));
router.get('/google/callback',passport.authenticate('google'),userMethods.oauthCallback);



// facebook
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback',passport.authenticate('facebook', { failureRedirect: '/login' }),userMethods.oauthCallback);


// local Strategy








// Register
router.get('/reg',userMethods.showRegistration);
router.post('/register',[
  body('name',"Please enter correct name")
    .isEmail(),
  body('mobile',"Please provide validate mobile number")
    .isMobilePhone(),
  body('address',"Please provide address min : 10 letters")
    .isString()
    .isLength({min : 10}),
  body('password',"Minimum length 5")
    .isLength({ min: 5 }),
  body('password_confirmation',"passsword dosnt match")
    .equals(req.body.password)
  ],
userMethods.register);



module.exports = router;


