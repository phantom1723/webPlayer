let passport = require('passport');
let User = require('../models/user.schema');
let twitterStrategy  = require('passport-twitter').Strategy;
let mailer = require("nodemailer");
let user_tracks = require('../models/user_tracks.shema');

passport.use('signUpTwitter',new twitterStrategy({
    consumerKey: process.env.TwitterConsumerKey,
    consumerSecret: process.env.TwitterConsumerSecret,
    userProfileURL  : 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true',
    callbackURL: "http://localhost:8888/twitter/callback",
    passReqToCallback   : true
  },
  function(req, accessToken, refreshToken, profile, done) {
  let emails = profile.emails.map(e => e.value);
    let smtpTransport = mailer.createTransport({
      type: 'OAuth2',
      service: "Gmail",
      secure: false,
      ignoreTLS: true,
      auth: {
        user: "music.one.test@gmail.com",
        pass: process.env.GoogleTestOnePassword
      }
    });

    let mail = {
      from: "music.one.test<from@gmail.com>",
      to: emails[0],
      subject: "registration",
      text: "you are registered"
    }

    User.findOne({$or: [{id_social_network: profile.id},{email: {$in: emails}}]}, function (err, user) {
      if (err) { return done(null, err); }
      if (user) { return done(null, user); }else{
        if(emails[0]){
          smtpTransport.sendMail(mail, function(error){
            if(error){
              return done(null, false);
            }else{
              smtpTransport.close();

              let newUser = new User({email: emails[0], name: profile.displayName, id_social_network: profile.id});
              newUser.save(function(err,user) {
                if (err){  throw err;}

                let playlist = new user_tracks({id_creator: user._id, playlist: [{playlistName:"default"}]});
                playlist.save(function(err) {
                  if (err)  throw err; return done(null, newUser);
                });
              });
            }
          });
        }else{
          let newUser = new User({ name: profile.displayName, id_social_network: profile.id});
          newUser.save(function(err) {
            if (err) throw err;
            let playlist = new user_tracks({id_creator: user._id, playlist: [{playlistName:"default"}]});
            playlist.save(function(err) {
              if (err) { throw err;} return done(null, newUser);
            });
          });
        }
      }
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null,user);
});

passport.deserializeUser(function(user, done) {
  User.findOne({$or: [{email: user.email},{id_social_network: user.id_social_network}]}, function (err, user) {
    done(err, user);
  });
});

module.exports = passport;