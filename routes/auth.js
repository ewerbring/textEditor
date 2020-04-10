const express = require("express");
const router = express.Router();
const User = require("../models/User");

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post('/signup', (req, res) => {
    console.log('SIGN UP ROUTE')

    const { username, password } = req.body

    if (username === "" || password === "") {
      return res.json({ message: "Please submit both fields."});
    } else if (password.length < 8) {
      return res.json({ message: "Password must be minimum 8 characters"})
    }
  
    User.findOne({ username }, "username", (err, user) => {
      if (user !== null) return res.json({ message: "This username is already taken."})
  
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
  
      const newUser = new User({
        username,
        password: hashPass
      });
  
      newUser.save().then(user=>{
        req.login(user,() => res.json(user))
      })
        
      .catch(err => {
        console.log("Error creating user" + err)
        res.json({ message: "Uh oh, something went wrong."})
      })
    });
})

module.exports = router;
