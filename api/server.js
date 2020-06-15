const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

// setup cookies
server.use(
    session({
      name: "totallynotasession",
      secret: "super mega secret",
      cookie: {
        maxAge: 1000 * 60,
        secure: false, // change to true in production
      },
      httpOnly: true,
      resave: false,
      saveUninitialized: false, // laws and stuff
    })
  );

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

module.exports = server;
