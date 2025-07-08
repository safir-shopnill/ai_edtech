import OpenAI from "openai";
const client = new OpenAI();

// This prompts the user right after showing the question in the html file
const question = prompt("Ask me a question about your career goals! Be sure to include what you want to get out of your job, and I will try my best to recommend a few possible careers!");

// Check if the question is null or empty
if (question == null|| question.trim() === "") {
    question = "Oh no! You didn't ask me a question! Reload the page and try again."; 

} 
// Gives specific instructions to the AI to provide career advice 
const response = await client.responses.create({
    model: "gpt-4o",
    instructions: "You are an AI career advisor. Provide 5 prospective careers that answer the user's question about their career goals in bullet point form and one tip on how to pursue it.",
    input: question,
});

// AI API function here


// Get the element from the HTML file where the div is at
const responseBox = document.getElementById("aiResponse");

// Display the response
responseBox.innerText = response.output_text;



