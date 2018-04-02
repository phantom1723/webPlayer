let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let passport = require('passport');
let mongoose = require('mongoose');
require('dotenv').load();
let signRoutes = require('./app/routes/signRoutes');
let userRoutes = require('./app/routes/userRoutes');

let cors = require('cors');

const port = process.env.PORT || 8888;
app.use(cors({credentials: true, origin: 'http://localhost:4200'}));

app.use(express.static(__dirname + "/public"));
app.use(require('cookie-parser')());
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(passport.initialize());

mongoose.connect('mongodb://admin:admin@ds115579.mlab.com:15579/spotify', function (err) {
  if (err) throw err;
  console.log('Successfully connected');
});

app.use('/', signRoutes);
app.use('/user', userRoutes);

app.listen(port, function () {
    console.log(`Server is listening on ${port}`);
});
