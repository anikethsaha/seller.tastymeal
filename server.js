
const express = require('express')
const bodyParser = require('body-parser')
const winston = require('winston')
var expressControllers = require('express-controller');
var session = require('express-session')
const cors = require('cors')
const helmet = require('helmet')
const { port , sessionSecretKey} = require('./configs/config')
const path  = require('path')
var csrf = require('csurf');
var RateLimit = require('express-rate-limit')
const passport = require('passport');
var passportStrategies = require('./configs/passport.config')
const mongoose = require('mongoose');
const {
  authRoutes
} = require('./src/routes')

// M
// Middlewares


//database connection
mongoose.connect('mongodb://localhost/tastymeal');

const app = express();
app.use(helmet());
// session Middleware
app.use(session({
    secret: sessionSecretKey,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))
// initialize passport
app.use(passport.initialize());
app.use(passport.session());
app.use(csrf());
app.set('port', (process.env.PORT ||port));

app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}))
app.use(bodyParser.json({limit: '50mb'}))
app.use(cors());
// use this middleware in authentications routes or post method routes
var authAPILimiter = new RateLimit({
    windowMs: 5*60*1000, // 5 minutes
    max: 1000,
    delayMs: 0 // disabled
  });
// loggin middleware
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

// V
// static files and views
app.use(express.static(path.join(__dirname, '/public')))
app.set('view engine' , 'ejs');
app.set('views', [path.join(__dirname, 'src/views'),
                  path.join(__dirname, 'src/views/layouts/')]);


// custom middlewares
// add isAuth middleware to protect any routes
const {isAuth} = require('./src/middlewares')


// C
//controller settings
//setting up the controller
expressControllers.setDirectory(path.join(__dirname,'src/controller')).bind(app);




app.use('/auth',authRoutes);

app.get('/',(req,res) => {
  res.render('index');
})

app.get('/seller',(req,res)=>{
  res.render('auth/seller');
})


app.get('/tiffin',isAuth,(req,res)=>{
   res.render('tiffin');

})
















app.listen(app.get('port'),() => {
    logger.info( '> Server is running on PORT ',app.get('port') );
})