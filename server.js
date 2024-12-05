const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3005;

// Helper function to read secrets from Render's plaintext files
const getSecret = (filename) => {
  try {
    return fs.readFileSync(path.join("/etc/secrets", filename), "utf8").trim();
  } catch (err) {
    console.error(`Error reading secret ${filename}:`, err);
    return null;
  }
};

// Read secrets from files
const openaiApiKey = getSecret("REACT_APP_OPENAI_API_KEY");
const assistantId = getSecret("REACT_APP_ASSISTANT_ID");

app.use(cors());
app.use(express.json());

// Example API route
app.get("/", (req, res) => {
  res.send("Hello, Render!");
});

// API route to send secrets to frontend
app.get("/api/config", (req, res) => {
  if (!openaiApiKey || !assistantId) {
    return res.status(500).json({ error: "Secrets not properly configured." });
  }

  res.json({
    openaiApiKey, // Expose to the frontend only if absolutely necessary
    assistantId,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
