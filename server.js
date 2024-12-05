const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Example API endpoint
app.get("/", (req, res) => {
  res.send("Hello from Render!");
});

app.post("/api/send-message", (req, res) => {
  const { message } = req.body;
  res.json({ reply: `You said: ${message}` });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
