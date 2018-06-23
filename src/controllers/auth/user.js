const {userModel }= require('../../models')
const bcrypt = require('bcrypt')
const { check, validationResult ,body } = require('express-validator/check');
const  { salt } = require('../../../configs/config')



module.exports = {
    showLogin : (req,res) => {
        res.render('auth/login');
    },
    oauthCallback : (req,res) => {
        res.redirect('/');
    },
    logout : (req,res) => {
        req.logout();
        res.redirect('/');
    },
    OauthCreateUser : (profile,done) => {
        userModel.findOne({_oauthid : profile.id},(err,user) => {
            if(err) done(null,false)
            if(user){
                 console.log("user exist");
                 done(null,user);
            }else{
                const newUser =  new userModel({
                        name : profile.displayName,
                        _oauthid : profile.id
                    }).save();
                 done(null,newUser);

            }
        })
    },
    createUser : userData =>{
        console.log('userData from  createUser:', userData);
        return new Promise((resolve,reject) => {
            new userModel({
                name : userData.displayName,
                _oauthid : userData.id
            }).save().then(newUser => {
                resolve(newUser);
            });
        })
    },
    showRegistration : (req,res) => {
        res.render('auth/register');
    },
    PasswordVerification :  (passwordToVerify , hashedPassword) => {

        return new Promise((resolve,reject) => {
          bcrypt.compare(passwordToVerify , hashedPassword , (err,result) => {
            if(err){
              return reject(err);
            }
            return resolve(result);//true
        })
        })

    },
    register : (req,res) => {
        const errors = validationResult(req);
        if(errors){
            res.render('auth/register',{
                errors
            })
        }
        const name = req.body.name;
        const email = req.body.email;
        const address = req.body.address;
        const mobile = req.body.name;
        const password = bcrypt.hashSync(req.body.password, salt);
        new userModel({
            name ,
            mobile ,
            address ,
            password ,
            email
        }).save((errors,newuser) => {
            if(errors){
                res.render('auth/register',{
                    errors
                })
            }
            res.render('auth/login',{
                message : "Your are registered ! please login now to continue "
            })

        });


    }

}