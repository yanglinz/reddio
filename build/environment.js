var dotenv = require('dotenv');

dotenv.load();  // source environmental variables from .env

var environment = {
  ENV: process.env.ENV,
  CI: process.env.CI,
  TRAVIS: process.env.TRAVIS,
  SURGE_DOMAIN: process.env.SURGE_DOMAIN,
  SURGE_TOKEN: process.env.SURGE_TOKEN
};

module.exports = environment;
