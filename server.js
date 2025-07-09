// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();


const app = express();
const port = 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/ask', async (req, res) => {
  const userQuestion = req.body.question;

  if (!userQuestion) {
    return res.status(400).json({ error: "No question provided." });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an AI career advisor. Provide 3 prospective careers that answer the user's question about their career goals in bullet point form and one tip on how to pursue it."
        },
        {
          role: "user",
          content: userQuestion
        }
      ]
    });

    res.json({ answer: response.choices[0].message.content });
  } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).json({ error: "AI failed to respond." });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
