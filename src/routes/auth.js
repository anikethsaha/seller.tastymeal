const router = require('express').Router();
const passport = require('passport');
const { sellerMethod } = require('../controllers/auth')

const { check, validationResult,body  } = require('express-validator/check');

// get login page
router.get('/login',sellerMethod.showLogin);

router.get('/logout',sellerMethod.logout);



// local Strategy








// Register
router.get('/register',sellerMethod.showRegistration);
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
    .equals('password')
  ],
sellerMethod.register);



module.exports = router;


