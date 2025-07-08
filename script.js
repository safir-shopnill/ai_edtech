
import OpenAI from "openai";
const client = new OpenAI();

// Async function so everything gets wrapped
async function getCareerAdvice() {
  let question = prompt(
    "Ask me a question about your career goals! Be sure to include what you want to get out of your job, and I will try my best to recommend a few possible careers!"
  );

  const responseBox = document.getElementById("aiResponse");

  // Check if the user canceled or left input blank, then stops further execution if so
  if (question == null || question.trim() === "") {
    responseBox.innerText =
      "Oh no! You didn't ask me a question! Reload the page and try again.";
    return; 
  }

  try {
    // Send request to OpenAI
    const response = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are an AI career advisor. Provide 5 prospective careers that answer the user's question about their career goals in bullet point form and one tip on how to pursue it.",
        },
        {
          role: "user",
          content: question,
        },
      ],
    });

    // Show the AI's response on the page
    responseBox.innerText = response.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    responseBox.innerText = "Sorry, something went wrong with the AI response.";
  }
}

// Call the function once the page loads
window.onload = getCareerAdvice;



