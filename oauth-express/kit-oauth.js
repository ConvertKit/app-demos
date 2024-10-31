const { Strategy: OAuth2Strategy } = require("passport-oauth2");
const { SCHEME, HOST, PORT } = require("./config");

const KIT_SERVER = process.env.KIT_SERVER || "kit.com";
const KIT_OAUTH_CLIENT_ID = process.env.KIT_OAUTH_CLIENT_ID || "FILL ME IN";
const KIT_OAUTH_CLIENT_SECRET =
  process.env.KIT_OAUTH_CLIENT_SECRET || "FILL ME IN";
const KIT_OAUTH_AUTHORIZATION_URL = `https://app.${KIT_SERVER}/oauth/authorize`;
const KIT_OAUTH_TOKEN_URL = `https://app.${KIT_SERVER}/oauth/token`;
const KIT_OAUTH_CALLBACK_URL = `${SCHEME}://${HOST}:${PORT}/oauth/kit/callback`;

OAuth2Strategy.prototype.userProfile = function (accessToken, done) {
  this._oauth2.get(
    `https://api.${KIT_SERVER}/v4/account`,
    accessToken,
    (err, body, res) => {
      if (err) {
        return done(new Error("Failed to fetch user profile"));
      }
      const json = JSON.parse(body);
      done(null, json);
    }
  );
};

const oauthConfiguration = {
  authorizationURL: KIT_OAUTH_AUTHORIZATION_URL,
  tokenURL: KIT_OAUTH_TOKEN_URL,
  clientID: KIT_OAUTH_CLIENT_ID,
  clientSecret: KIT_OAUTH_CLIENT_SECRET,
  callbackURL: KIT_OAUTH_CALLBACK_URL,
};
const KitOAuth = new OAuth2Strategy(
  oauthConfiguration,
  (accessToken, refreshToken, profile, cb) => {
    // Find or create user in database
    const user = {
      kitId: profile.account.id,
      kitAccessToken: accessToken,
      kitRefreshToken: refreshToken,
    };
    console.log("Authenticated Kit user", { user, profile });
    return cb(null, user);
  }
);

console.log("Kit OAuth Configuration", oauthConfiguration);

module.exports = KitOAuth;
