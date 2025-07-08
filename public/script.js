document.getElementById("submitbutton").addEventListener("click", async () => {
  const question = document.getElementById("userQuestion").value;
  const responseBox = document.getElementById("aiResponse");

  if (!question.trim()) {
    responseBox.innerText = "Please enter a question before submitting.";
    return;
  }

  responseBox.innerText = "Thinking...";

  try {
    const res = await fetch("/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question })
    });

    const data = await res.json();

    if (data.answer) {
      responseBox.innerText = data.answer;
    } else {
      responseBox.innerText = "No response from AI.";
    }
  } catch (error) {
    console.error("Error:", error);
    responseBox.innerText = "An error occurred while fetching AI response.";
  }
});






