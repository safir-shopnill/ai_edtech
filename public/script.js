document.getElementById("submitbutton").addEventListener("click", async () => {
  const question = document.getElementById("userQuestion").value;
  const responseBox = document.getElementById("aiResponse");

  if (!question.trim()) {
    responseBox.innerText = "Please enter a question before submitting.";
    return;
  }

  responseBox.innerText = "Thinking...";

  try {
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: question })

    });

    const data = await res.json();
    console.log("Full response from /api/ask:", data);
    const aiMessage = data.choices?.[0]?.message?.content;

if (aiMessage) {
  responseBox.innerText = aiMessage;
} else {
  responseBox.innerText = "No response from AI.";
}

  } catch (error) {
    console.error("Error:", error);
    responseBox.innerText = "An error occurred while fetching AI response.";
  }
});






