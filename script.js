import OpenAI from "openai";
const client = new OpenAI();

let question = prompt("Ask me a question about your career goals! Be sure to include what you want to get out of your job, and I will try my best to recommend a few possible careers!");
if (question == null) {
    question = "Oh no! You didn't ask me a question! Please ask me one!";
} 
else if (question.trim() === "") {
    question = "Oh no! You didn't ask me a question! Please ask me one!";
}
const response = await client.responses.create({
    model: "gpt-4o",
    instructions: "You are an AI career advisor. Provide a thoughtful response to the user's question about their career goals.",
    input: question,
});

console.log(response.output_text);