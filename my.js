let questions = [];
        let userSelections = JSON.parse(localStorage.getItem("myQuizProgress")) || {};

        async function loadQuiz() {
            try {
                const response = await fetch("questions.json");
                questions = await response.json();
                renderQuiz();
            } catch (error) {
                document.getElementById("quiz-box").innerHTML = "<p class='text-center text-red-500'>Error loading data.</p>";
            }
        }

        function renderQuiz() {
            const quizBox = document.getElementById("quiz-box");
            quizBox.innerHTML = "";

            questions.forEach((q, qIdx) => {
                const card = document.createElement("div");
                card.className = "card";
                
                let cardContent = `<h3>${q.question}</h3>`;
                if (q.img && q.img.trim() !== "") {
                    cardContent += `<img src="${q.img}" class="question-img">`;
                }
                card.innerHTML = cardContent;

                // FIX APPLIED HERE: Using ["options:"] to match your JSON
                const optionsObj = q["options"]; 
                
                if (optionsObj) {
                    Object.entries(optionsObj).forEach(([key, text]) => {
                        const optDiv = document.createElement("div");
                        optDiv.className = "option";
                        optDiv.innerHTML = `<span class="mr-3 font-bold opacity-40">${key}.</span> <p class="optext">${text}</p> `;

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
                }

                quizBox.appendChild(card);
            });
        }

        function selectOption(qIdx, selectedKey) {
            userSelections[qIdx] = selectedKey;
            localStorage.setItem("myQuizProgress", JSON.stringify(userSelections));
            renderQuiz();
        }

        function resetQuiz() {
            if(confirm("Reset all progress?")) {
                localStorage.removeItem("myQuizProgress");
                userSelections = {};
                renderQuiz();
                window.scrollTo(0,0);
            }
        }


        loadQuiz();
