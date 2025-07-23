import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import handler from "./api/ask.js";

dotenv.config();
const app = express();
app.use(bodyParser.json());

//  Get correct directory name for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//  Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

//  Root route → always serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

//  API route → forwards to ask.js handler
app.post("/api/ask", (req, res) => {
  handler(req, res);
});

//  Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
