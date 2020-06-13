const router = require('express').Router();
const db = require('../database/dbConfig');
const session = require('express-session');
const bcrypt = require('bcrypt');

router.post('/register', (req, res) => {
  // implement registration
  const user = req.body;

  if (user.username && user.password){
    const hash = bcrypt.hashSync(user.password, 14);

    db('users')
      .insert({username: user.username, password: hash})
      .then(response => {
        res.status(201).json({successMessage: `The user has been registered: ${response}`})
      })
      .catch(err => {
        res.status(500).json({errorMessage: `There was an error with saving that user to the database ${err}`});
      });
  } else {
    res.status(400).json({errorMessage: "Please be sure to provide a username and a password to register"})
  }
});

router.post('/login', (req, res) => {
  // implement login
  const credentials = req.body;

  db('users')
    .first()
    .where('username', credentials.username)
    .then(user => {
      if (user && bcrypt.compareSync(credentials.password, user.password)){
        req.session.user = user.username;
        res.status(200).json({success: "You have successfully logged in!", username: user.username});
      } else {
        res.status(400).json({errorMessage: "You have entered in incorrect credentials"});
      }
    })
    .catch(err => {
      res.status(500).json({errorMessage: `You likely entered in incorrect credentials, please see the error ${err}`});
    });
});

module.exports = router;
