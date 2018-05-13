let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let passport = require('passport');
let mongoose = require('mongoose');
require('dotenv').load();
let signRoutes = require('./app/routes/signRoutes');
let userRoutes = require('./app/routes/userRoutes');
var session = require('express-session');
let cors = require('cors');

let google_passport = require('./app/routes/google_passport');
let twitter_passport = require('./app/routes/twitter_passport');

const port = process.env.PORT || 8888;
app.use(cors({credentials: true, origin: 'http://localhost:4200'}));

app.use(express.static(__dirname + "/public"));
app.use(require('cookie-parser')());
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.SECRET
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://admin:'+ process.env.MLABPASSWORD + '@ds139919.mlab.com:39919/spotify', function (err) {
  if (err) throw err;
  console.log('Successfully connected');
});

app.use('/', signRoutes);
app.use('/user', userRoutes);

app.listen(port, function () {
    console.log(`Server is listening on ${port}`);
});
