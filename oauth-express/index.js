const https = require("https");
const express = require("express");
const passport = require("passport");

const { HOST, PORT, HTTPS_KEY, HTTPS_CERT } = require("./config");
const KitOAuth = require("./kit-oauth");

const app = express();
const server = https.createServer({ key: HTTPS_KEY, cert: HTTPS_CERT }, app);

passport.use(KitOAuth);
app.get("/oauth/kit", passport.authenticate("oauth2"));
app.get(
  "/oauth/kit/callback",
  passport.authenticate("oauth2", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => res.redirect(KitOAuth.KIT_OAUTH_INSTALL_REDIRECT)
);

server.listen(PORT, HOST, () => console.log(`Listening on :${PORT}`));
