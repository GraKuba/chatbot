const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3005;

// Access environment variables from Render
const openaiApiKey = process.env.REACT_APP_OPENAI_API_KEY;
const assistantId = process.env.REACT_APP_ASSISTANT_ID;

app.use(cors());
app.use(express.json());

// Example API route
app.get("/", (req, res) => {
  res.send("Hello, Render!");
});

// API route to send secrets to the frontend (only if necessary)
app.get("/api/config", (req, res) => {
  if (!openaiApiKey || !assistantId) {
    return res.status(500).json({ error: "Environment variables are not configured properly." });
  }

  res.json({
    openaiApiKey, // Only expose to the frontend if absolutely necessary
    assistantId,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
