const fs = require("fs");
const path = require("path");

const SCHEME = process.env.SCHEME || "https";
const HOST = process.env.HOST || "localhost";
const PORT = Number.parseInt(process.env.PORT || "8080");
const HTTPS_KEY = fs.readFileSync(path.join(__dirname, "example.com-key.pem"));
const HTTPS_CERT = fs.readFileSync(path.join(__dirname, "example.com.pem"));

module.exports = {
  SCHEME,
  HOST,
  PORT,
  HTTPS_CERT,
  HTTPS_KEY,
};
