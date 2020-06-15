const server = require('./api/server.js');
const session = require('express-session');

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

const PORT = process.env.PORT || 3300;
server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});
