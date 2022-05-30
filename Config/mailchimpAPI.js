const mailchimp = require("@mailchimp/mailchimp_marketing");
require("dotenv").config();
mailchimp.setConfig({
  apiKey: process.env.NODE_API_KEY, //Your API key
  server: process.env.NODE_SERVER,
});

module.exports = mailchimp;
