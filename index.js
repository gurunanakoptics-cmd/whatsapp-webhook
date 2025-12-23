// force redeploy
const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// Health check (Railway & browser)
app.get("/", (req, res) => {
  res.status(200).send("Webhook server is running");
});

// Meta webhook verification
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
    console.log("Webhook verified successfully");
    return res.status(200).send(challenge);
  }

  return res.status(403).send("Verification failed");
});

// Receive WhatsApp messages
app.post("/webhook", (req, res) => {
  console.log("Incoming WhatsApp webhook:");
  console.log(JSON.stringify(req.body, null, 2));

  res.sendStatus(200);
});

// Railway requires PORT binding
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
