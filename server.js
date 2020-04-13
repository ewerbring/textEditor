require('dotenv').config(); // read .env files

const bodyParser = require('body-parser')
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session); 

require('./passport');

const app = express();
const port = process.env.PORT || 3000;

// Establish mongoDB connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/text-editor", {
    useNewUrlParser: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

// Set public folder as root
app.use(express.static('public'));
// Set logger levels for debugging in terminal
app.use(logger("dev"));
// Parse data from http requests 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
  
// Create user sessions for auth
app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    // Saves user sessions in mongoDB
    store: new MongoStore({ 
      mongooseConnection: mongoose.connection,
      ttl: 25 * 60 * 60 
    })
  }));

app.use(passport.initialize())
app.use(passport.session())

// Allows front end to access node_modules
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

// Gives app access to routes
const auth = require('./routes/auth.js')
app.use('/auth', auth)

const content = require('./routes/content.js')
app.use('/content', content)

// Directs user to index.html if no route found
app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));

// Listen for HTTP requests on port 3000
app.listen(port, () => {
  console.log('listening on %d', port);
});

module.exports = app;
