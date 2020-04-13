const express = require("express");
const router = express.Router();
const User = require("../models/User");

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post('/signup', (req, res) => {
    console.log("### SIGNUP ###")

    const { username, password } = req.body

    if (username === "" || password === "") {
      return res.json({ message: "Please submit both fields."});
    } else if (password.length < 8) {
      return res.json({ message: "Password must be minimum 8 characters"})
    }
  
    User.findOne({ username }, (err, user) => {
    // Uncomment following line if username must be unique
    // if (user !== null) return res.json({ message: "This username is already taken."})
  
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
  
      const newUser = new User({
        username,
        password: hashPass
      });
  
      newUser.save().then(user => {
        req.login(user, () => res.json(user))
      })
        
      .catch(err => {
        console.log("Error creating user" + err)
        res.json({ message: "Uh oh, something went wrong."})
      })
    });
})

router.post("/login", (req, res) => {
    console.log('### LOGIN ###')

    const { username, password } = req.body
  
    if (!username.length || !password.length) {
      return res.status(400).json({ message: "Please enter both fields"})
    }
    
    User.findOne({ username })
      .then(user => {
        if (!user) {
          return res.json({ message: "Please provide valid credentials."})
        }
  
        if (bcrypt.compare(password, user.password)) {
          req.session.currentUser = user
         
          req.login(user,() => res.json(user))
        } else {
          return res.json({ message: "Please provide valid credentials."})
        }
      })
      .catch(err => next(err))
})

router.get('/logout', (req, res, next) => {
  console.log('### LOGOUT ###')

  if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          return next(err);
        } else {
          return res.redirect('/');
        }
      });
    }
});

module.exports = router;
