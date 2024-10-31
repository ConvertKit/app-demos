const https = require("https");
const express = require("express");
const session = require("express-session");
const passport = require("passport");

const { HOST, PORT, HTTPS_KEY, HTTPS_CERT } = require("./config");
const KitOAuth = require("./kit-oauth");

const app = express();
const server = https.createServer({ key: HTTPS_KEY, cert: HTTPS_CERT }, app);

passport.use(KitOAuth);
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.get(
  "/oauth/kit",
  (req, res, next) => {
    req.session.kitOAuthRedirect = req.query.redirect;
    next();
  },
  passport.authenticate("oauth2")
);
app.get(
  "/oauth/kit/callback",
  passport.authenticate("oauth2", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => res.redirect(req.session.kitOAuthRedirect)
);

server.listen(PORT, HOST, () => console.log(`Listening on :${PORT}`));
