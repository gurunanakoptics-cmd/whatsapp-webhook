const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.status(200).send("Webhook server is running");
});

// Meta webhook verification
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
    console.log("Webhook verified");
    return res.status(200).send(challenge);
  }

  return res.status(403).send("Verificat
