document.getElementById("submitbutton").addEventListener("click", handleAsk);

// ✅ Parse AI response into an array of careers
function parseCareers(text) {
  return text
    .split("\n")
    .filter(line => /^\d+\./.test(line)) // only 1., 2., 3.
    .map(line => line.replace(/^\d+\.\s*/, "").trim());
}

// ✅ First step: Ask for career suggestions
async function handleAsk() {
  const question = document.getElementById("userQuestion").value;
  const responseBox = document.getElementById("aiResponse");
  const outputDiv = document.getElementById("output");

  if (!question.trim()) {
    responseBox.innerText = "Please enter a question before submitting.";
    return;
  }

  responseBox.innerText = "Thinking...";
  outputDiv.innerHTML = ""; // clear any old results

  try {
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: question }),
    });

    const data = await res.json();
    const aiMessage = data.choices?.[0]?.message?.content;

    console.log("AI Message:", aiMessage); // ✅ Debugging

    if (!aiMessage) {
      responseBox.innerText = "No response from AI.";
      return;
    }

    responseBox.innerText = "Choose a career below:";

    // ✅ Parse the 3 careers and show as buttons
    const careers = parseCareers(aiMessage);

    if (careers.length === 0) {
      responseBox.innerText = "Couldn't find careers in AI response.";
      return;
    }

    careers.forEach(career => {
      const btn = document.createElement("button");
      btn.textContent = career;
      btn.onclick = () => getCareerDetails(career);
      outputDiv.appendChild(btn);
    });

    // ✅ Show tip if present
    const tipLine = aiMessage.split("\n").find(line => line.startsWith("Tip:"));
    if (tipLine) {
      const tip = document.createElement("p");
      tip.textContent = tipLine;
      outputDiv.appendChild(tip);
    }

  } catch (error) {
    console.error("Error:", error);
    responseBox.innerText = "An error occurred while fetching AI response.";
  }
}

// ✅ Second step: Ask for details about the chosen career
async function getCareerDetails(career) {
  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = `<p>Loading details for ${career}...</p>`;

  try {
    const response = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ career }),
    });

    const data = await response.json();
    outputDiv.innerHTML = `<h3>${career}</h3><p>${data.choices[0].message.content}</p>`;
  } catch (error) {
    console.error("Error:", error);
    outputDiv.innerHTML = "An error occurred while fetching career details.";
  }
}

