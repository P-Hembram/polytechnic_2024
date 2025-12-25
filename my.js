let questions = [];
let userSelections = JSON.parse(localStorage.getItem("myQuizProgress")) || {};

// 1. Fetch data from the separate JSON file
async function loadQuiz() {
  try {
    const response = await fetch("questions.json");
    questions = await response.json();
    renderQuiz();
  } catch (error) {
    document.getElementById("quiz-box").innerHTML =
      "Error loading questions. Ensure you are using a local server.";
  }
}

// 2. Display the questions

function renderQuiz() {
  const quizBox = document.getElementById("quiz-box");
  quizBox.innerHTML = "";

  questions.forEach((q, qIdx) => {
    const card = document.createElement("div");
    card.className = "card";
    
    // 1. Add the question text
    let cardContent = `<h3>${qIdx + 1}. ${q.question}</h3>`;
    
    // 2. NEW: Check if 'img' exists and is not empty
    if (q.img && q.img.trim() !== "") {
      cardContent += `<img src="${q.img}" alt="Question Image" style="max-width:300px; height:auto; margin-bottom:15px; display:block;">`;
    }
    
    card.innerHTML = cardContent;

    Object.entries(q.options).forEach(([key, text]) => {
      const optDiv = document.createElement("div");
      optDiv.className = "option";
      optDiv.innerText = `${key}: ${text}`;

      // Persistence Logic
      if (userSelections[qIdx]) {
        optDiv.classList.add("disabled");
        if (key === q.answer) optDiv.classList.add("correct");
        if (key === userSelections[qIdx] && key !== q.answer)
          optDiv.classList.add("wrong");
      } else {
        optDiv.onclick = () => selectOption(qIdx, key);
      }

      card.appendChild(optDiv);
    });
    quizBox.appendChild(card);
  });
}

// 3. Handle user click
function selectOption(qIdx, selectedKey) {
  userSelections[qIdx] = selectedKey;
  localStorage.setItem("myQuizProgress", JSON.stringify(userSelections));
  renderQuiz(); // Refresh to show colors
}

// 4. Clear LocalStorage
function resetQuiz() {
  localStorage.removeItem("myQuizProgress");
  userSelections = {};
  renderQuiz();
}

loadQuiz();
