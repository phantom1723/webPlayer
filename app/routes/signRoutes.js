let express = require('express');
let router = express.Router();
let local_passport = require('../routes/local_passport');
let passport = require('passport');
let User = require('../models/user.schema');
let user_tracks = require('../models/user_tracks.shema');
let mailer = require("nodemailer");

router.get('/auth/twitter', passport.authenticate('signUpTwitter', { scope : ['profile', 'email'] }));

router.get('/twitter/callback', function(req, res, next) {
  passport.authenticate('signUpTwitter',function(err,user){
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({status:401,error:'authentication failed,login or password entered incorrectly'});
    }else{
      var token = user.generateJwt();
      res.cookie('token',token,{httpOnly: true});
      res.json({status:200,token: token});
    }
  })(req, res, next);
});

router.get('/auth/google', passport.authenticate('signUpGoogle', { scope : ['profile', 'email'] }));

router.get('/google/callback', function(req, res, next) {
  passport.authenticate('signUpGoogle',function(err,user){
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({status:401,error:'authentication failed,login or password entered incorrectly'});
    }else{
      var token = user.generateJwt();
      res.cookie('token',token,{httpOnly: true});
      res.json({status:200,token: token});
    }
  })(req, res, next);
});

router.post('/signIn', function(req, res, next) {
  passport.authenticate('signIn', function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({status:401,error:'authentication failed,login or password entered incorrectly'});
    }else{
      var token = user.generateJwt();
      res.cookie('token',token,{httpOnly: true});
      res.json({status:200,token: token});
    }
  })(req, res, next);
});

router.post('/signUp', function(req, res, next) {
  local_passport.authenticate('signUp', function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({status:404,error:'authentication failed , please write the existing email'});
    }else{
      var token = user.generateJwt();
      res.cookie('token',token,{httpOnly: true});
      res.json({status:200,token: token});
    }
  })(req, res, next);
});

router.get('/signOut', function(req, res){
  res.clearCookie('token');
  req.logout();
  res.json({status:200,user:'you are logged out'});
});

router.post('/recoveryPwd', function(req, res){
  let recoveryPwd = Math.random().toString(36).substr(2, 9);

  let smtpTransport = mailer.createTransport({
    type: 'OAuth2',
    service: "Gmail",
    secure: false,
    ignoreTLS: true,
    auth: {
      user: "music.one.test@gmail.com",
      pass: "musicone1"
    }
  });

  let mail = {
    from: "music.one.test<from@gmail.com>",
    to: req.body.email,
    subject: "recovery password",
    text: "Your new password is "+ recoveryPwd
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if(err) res.json({status:500,error: err});
    if(!user) {res.json({status:500,error: 'you are not registered'})}else{
      smtpTransport.sendMail(mail, function(error, response){
        if(error){
          res.json({status:500,error:'please , write real email'});
        }else{
          user.setPassword(recoveryPwd);
          user.save();
          res.json({status:200,message:response});
        }
        smtpTransport.close();
      });
    }
  });
});

module.exports = router;