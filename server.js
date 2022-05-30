const mailchimp = require("@mailchimp/mailchimp_marketing");
const express = require("express");
const fs = require("fs");

const audienceRoutes = require("./routes/audienceRoutes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require("dotenv").config();

app.use("/api", audienceRoutes);

console.log(process.env.NODE_API_KEY);
console.log(process.env.NODE_SERVER);

app.get("/checkConnectionStatus", async (req, res) => {
  try {
    const response = await mailchimp.ping.get();
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

app.listen(4000, () => console.log("server is running on 4000"));
