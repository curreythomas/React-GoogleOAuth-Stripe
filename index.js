const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);
const app = express();

//create cookie
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30days
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

//base route
app.get('/', (req, res) => {
  res.send(
    '<h1  style="font-family: sans-serif; color: blue;">The server is up!</h1>'
  );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
