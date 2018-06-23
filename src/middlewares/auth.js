module.exports = {
    isAuth : (req,res,next) => {
        if( !req.isAuthenticated()
            && typeof req.session.passport === 'undefined'
            && !req.session.passport){
            res.redirect('/auth/login');
          }
          next();
    }
}