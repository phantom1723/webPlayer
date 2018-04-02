let express = require('express');
let router = express.Router();
let passport = require('../routes/local_passport').passport;
let checkAuthentication = require('../routes/local_passport').checkAuthentication;
let request = require('request');

let User = require('../models/user.schema');
let user_tracks = require('../models/user_tracks.shema');

router.post('/signIn', function(req, res, next) {
  passport.authenticate('signIn', function(err, user) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (!user) {
      return res.json({status:401,error:'authentication failed'});
    }else{
      var token = user.generateJwt();
      res.cookie('token',token,{httpOnly: true});
      res.json({status:200,token: token});
    }
  })(req, res, next);
});

router.post('/signUp', function(req, res, next) {
  passport.authenticate('signUp', function(err, user) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (!user) {
      return res.json({status:404,error:'authentication failed'});
    }else{
      var token = user.generateJwt();
      res.cookie('token',token,{httpOnly: true});

      let playlist = new user_tracks({id: user._id, playlist: [{playlistName:"default"}]});
      playlist.save();

      res.json({status:200,token: token});
    }
  })(req, res, next);
});

router.get('/signOut', function(req, res){
  res.clearCookie('token');
  req.logout();
  res.json({status:200,user:'you are logged out'});
});

module.exports = router;