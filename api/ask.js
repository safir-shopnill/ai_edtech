export default async function handler(req, res) {
  if (req.method !== "POST") {
    console.log("Wrong method");
    return res.status(405).json({ error: "Method not allowed" });
  }

  // ✅ Accept BOTH prompt and career from the request
  const { prompt, career } = req.body;
  console.log("Received:", prompt || career);

  if (!process.env.OPENAI_API_KEY) {
    console.error("Missing OpenAI API key");
    return res.status(500).json({ error: "Missing API key" });
  }

  try {
    // ✅ Choose which type of system prompt to use
    const systemMessage = career
      ? "You are a helpful career advisor. Provide detailed information about this career, including required skills, typical salary range, and steps to get started."
      : "You are a helpful and concise career advisor. Always respond with exactly 3 career suggestions and 1 practical career tip based on the user's input. Format the careers as a numbered list, and the tip as a sentence starting with 'Tip:'.";

    // ✅ Choose the correct user message
    const userMessage = career
      ? `Tell me about the career. Include the median salary, education required, and job track, but make it concise. In 100 words or less if possible.: ${career}.`
      : prompt;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
  model: "gpt-4",
  messages: [
    {
      role: "system",
      content: systemMessage,
    },
    {
      role: "user",
      content: userMessage,
    },
  ],
}),
    });

    const data = await response.json();
    console.log("OpenAI response:", data);
    res.status(200).json(data);

  } catch (error) {
    console.error("OpenAI fetch error:", error);
    res.status(500).json({ error: "Error fetching AI response" });
  }
}


