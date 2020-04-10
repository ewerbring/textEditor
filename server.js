require('dotenv').config(); // read .env files

const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session); 

require('./passport');

const app = express();
const port = process.env.PORT || 3000;

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

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

// Set public folder as root
app.use(express.static('public'));
app.use(logger("dev"));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended:false}));
app.use(cookieParser());

app.use(
    require("node-sass-middleware")({
      src: path.join(__dirname, "public"),
      dest: path.join(__dirname, "public"),
      sourceMap: true
    })
  );
  
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public/index.html")));

app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ 
      mongooseConnection: mongoose.connection,
      ttl: 25 * 60 * 60 
    })
  }));

app.use(passport.initialize())
app.use(passport.session())

// Allow front-end access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));

// Listen for HTTP requests on port 3000
app.listen(port, () => {
  console.log('listening on %d', port);
});

const auth = require('./routes/auth.js')
app.use('/api/auth/', auth)

module.exports = app;
