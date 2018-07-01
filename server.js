const express = require('express')
const bodyParser = require('body-parser')
const winston = require('winston')
var cookieParser = require('cookie-parser')
var expressControllers = require('express-controller');
var session = require('express-session')
const cors = require('cors')
const helmet = require('helmet')
const { port , sessionSecretKey} = require('./configs/config')
const path  = require('path')
var csrf = require('csurf');
var RateLimit = require('express-rate-limit')
var{ authRoutes,resourceRoutes ,serviceRoutes}= require('./src/routes')
const mongoose = require('mongoose');
var expressValidator = require('express-validator');
const sanitizeBody = require('express-validator/filter');
const passport = require('passport');
var passportStrategies = require('./configs/passport.config')
//database connection
mongoose.connect('mongodb://localhost/tastymeal');



// M
// Middlewares
const app = express();
app.use(helmet());

// session Middleware
app.use(session({
    secret: sessionSecretKey,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

app.set('port', (process.env.PORT ||port));
app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}))
app.use(bodyParser.json({limit: '50mb'}))
app.use(cors());
// use this middleware in authentications routes or post method routes

var authAPILimiter = new RateLimit({
    windowMs: 5*60*1000, // 5 minutes
    max: 1000,
    delayMs: 0 // disabled
  });

const logger = winston.createLogger({
    level: 'info',
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
      new winston.transports.File({ filename: './logs/debug.log', level: 'debug' }),
      new winston.transports.File({ filename: './logs/crit.log', level: 'crit' }),
      new winston.transports.File({ filename: './logs/warn.log', level: 'warn' }),
      new winston.transports.File({ filename: './logs/combined.log' })
    ]
  });

// app.use(csrf());
// initialize passport
app.use(passport.initialize());
app.use(passport.session());




//validator
app.use(expressValidator());



// V
// static files and views
app.use(express.static(path.join(__dirname, '/public')))
app.set('view engine' , 'ejs');
app.set('views', [path.join(__dirname, 'src/views'),
                  path.join(__dirname, 'src/views/layouts/')]);



// C
//controller settings
//setting up the controller
expressControllers.setDirectory(path.join(__dirname,'/controller')).bind(app);



// local variables
// var csrfProtect = csrf();
// app.use(function(req,res,next){
//   var token = req.csrfToken();
//   res.cookie('xsrf-token', token);
//   res.locals.csrfToken  =token;
//   next();
// });

const { isAuth } = require('./src/middlewares')

// routes
app.get('/',(req,res) => {
    res.render('index');
})
app.use('/resource',resourceRoutes);
app.use('/service',serviceRoutes);
app.use('/seller/auth',authRoutes);
app.get('/dashboard',isAuth,(req,res) => {
  console.log('req :', req.isAuthenticated());
  res.send("ok");
})
app.get('/sellWithUs',(req,res) => {
  res.render('sellWithUs');
})
app.get('/store',(req,res) => {
  res.render('store');
})

app.get('/advertise',(req,res) => {
  res.render('advertise');
})
app.get('/faq',(req,res) => {
  res.render('faq');
})















app.listen(app.get('port'),() => {
    logger.info( '> Server is running on PORT ',app.get('port') );
})