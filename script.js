document.addEventListener('DOMContentLoaded', function () {
    var demoQuizData = {
        "H": "1-1", "Li": "1-2", "Na": "1-3", "K": "1-4", "Rb": "1-5", "Cs": "1-6", "Fr": "1-7",
        "Be": "2-2", "Mg": "2-3", "Ca": "2-4", "Sr": "2-5", "Ba": "2-6", "Ra": "2-7",
        "B": "3-2", "Al": "3-3", "Ga": "3-4", "In": "3-5", "Tl": "3-6",
        "C": "4-2", "Si": "4-3", "Ge": "4-4", "Sn": "4-5", "Pb": "4-6",
        "N": "5-2", "P": "5-3", "As": "5-4", "Sb": "5-5", "Bi": "5-6",
        "O": "6-2", "S": "6-3", "Se": "6-4", "Te": "6-5", "Po": "6-6",
        "F": "7-2", "Cl": "7-3", "Br": "7-4", "I": "7-5", "At": "7-6",
        "He": "8-1", "Ne": "8-2", "Ar": "8-3", "Kr": "8-4", "Xe": "8-5", "Rn": "8-6",

        "1-1": "H", "1-2": "Li", "1-3": "Na", "1-4": "K", "1-5": "Rb", "1-6": "Cs", "1-7": "Fr",
        "2-2": "Be", "2-3": "Mg", "2-4": "Ca", "2-5": "Sr", "2-6": "Ba", "2-7": "Ra",
        "3-2": "B", "3-3": "Al", "3-4": "Ga", "3-5": "In", "3-6": "Tl",
        "4-2": "C", "4-3": "Si", "4-4": "Ge", "4-5": "Sn", "4-6": "Pb",
        "5-2": "N", "5-3": "P", "5-4": "As", "5-5": "Sb", "5-6": "Bi",
        "6-2": "O", "6-3": "S", "6-4": "Se", "6-5": "Te", "6-6": "Po",
        "7-2": "F", "7-3": "Cl", "7-4": "Br", "7-5": "I", "7-6": "At",
        "8-1": "He", "8-2": "Ne", "8-3": "Ar", "8-4": "Kr", "8-5": "Xe", "8-6": "Rn"

    };

    var currentQuestion = "";
    var currentAnswer = "";
    var cardTurned = false;
    var index = Math.floor(Math.random() * 88);
    var score = 0;
    var skipCount = 0;

    var timerInterval;
    var timerSeconds = 0;
    var timerRunning = false;

    var gameContainer = document.getElementById('game-container');
    var additionalContainer = document.getElementById('additional-container');
    additionalContainer.style.backgroundColor = '#CDC392';
    additionalContainer.style.display = 'none';

    var backButton = document.createElement('button');
    backButton.textContent = 'Back to Game';
    backButton.className = 'action-button back-button';
    backButton.style.position = 'absolute';
    backButton.style.bottom = '11px';
    backButton.style.left = '-10px';  // เพิ่มบรรทัดนี้
    backButton.addEventListener('click', function () {
        additionalContainer.style.display = 'none';
        gameContainer.removeChild(additionalContainer);
    });

    var additionalContainer = document.getElementById('additional-container');
    var paragraphElement = document.createElement('p');
    var textContent = "ถ้าโจทย์ให้สัญลักษณ์ธาตุมาให้ตอบเป็นหมู่-คาบ";
    var paragraphElement2 = document.createElement('p');
    var textContent2 = "เช่น Li 1-2";
    var paragraphElement3 = document.createElement('p');
    var textContent3 = "ถ้าโจทย์ให้หมู่-คาบมาให้ตอบเป็นสัญลักษณ์ธาตุ";
    var paragraphElement4 = document.createElement('p');
    var textContent4 = "เช่น 1-2 Li";

    paragraphElement.textContent = textContent;
    paragraphElement.style.color = '#304C89';
    paragraphElement.style.fontSize = '1.2em';
    paragraphElement.style.marginTop = '0';  // เพิ่มบรรทัดนี้
    paragraphElement.style.marginBottom = '10px';  // เพิ่มบรรทัดนี้

    paragraphElement2.textContent = textContent2;
    paragraphElement2.style.color = '#304C89';
    paragraphElement2.style.fontSize = '1.2em';
    paragraphElement2.style.marginTop = '0';  // เพิ่มบรรทัดนี้

    paragraphElement3.textContent = textContent3;
    paragraphElement3.style.color = '#304C89';
    paragraphElement3.style.fontSize = '1.2em';
    paragraphElement3.style.marginTop = '0';  // เพิ่มบรรทัดนี้
    paragraphElement3.style.marginBottom = '10px';  // เพิ่มบรรทัดนี้

    paragraphElement4.textContent = textContent4;
    paragraphElement4.style.color = '#304C89';
    paragraphElement4.style.fontSize = '1.2em';
    paragraphElement4.style.marginTop = '0';  // เพิ่มบรรทัดนี้
    
    additionalContainer.appendChild(paragraphElement);
    additionalContainer.appendChild(paragraphElement2);
    additionalContainer.appendChild(paragraphElement3);
    additionalContainer.appendChild(paragraphElement4);
    additionalContainer.appendChild(backButton);
    additionalContainer.style.backgroundColor = 'e8e5ff00';

    // additionalContainer.style.display = 'flex';
// additionalContainer.style.flexDirection = 'column';
// additionalContainer.style.justifyContent = 'center';
// additionalContainer.style.alignItems = 'center';

    document.getElementById('help-button').addEventListener('click', function () {
        additionalContainer.style.display = (additionalContainer.style.display === 'none') ? 'flex' : 'none';

        if (additionalContainer.style.display !== 'none') {
            additionalContainer.style.position = 'absolute';
            additionalContainer.style.width = '100%';
            additionalContainer.style.height = '100%';
            additionalContainer.style.top = '0';
            additionalContainer.style.left = '0';
            additionalContainer.style.backgroundColor = '#fff';

            gameContainer.appendChild(additionalContainer);
        } else {
            additionalContainer.style.position = 'relative';
            gameContainer.removeChild(additionalContainer);
        }
    });

    function updateCard(color) {
        currentQuestion = Object.keys(demoQuizData)[index];
        currentAnswer = Object.values(demoQuizData)[index];

        var flashcardElement = document.getElementById('flashcard');
        flashcardElement.style.backgroundColor = color;
        flashcardElement.innerText = !cardTurned ? currentQuestion : currentAnswer;
    }

    updateCard('#E8E5DA');

    function startTimer() {
        if (!timerRunning) {
            timerRunning = true;
            timerInterval = setInterval(function () {
                timerSeconds++;
                document.getElementById('timer').innerText = 'Time: ' + timerSeconds;
                document.getElementById('timer-button').style.backgroundColor = '#34495e';
            }, 1000);
        }
    }

    function stopTimer() {
        if (timerRunning) {
            timerRunning = false;
            clearInterval(timerInterval);
            document.getElementById('timer-button').style.backgroundColor = '#CDC392';
        }
    }

    function resetTimer() {
        timerSeconds = 0;
        document.getElementById('timer').innerText = 'Time: 0';
    }


    document.addEventListener('keydown', function (event) {
        if (event.key === ' ') {
            cardTurned = !cardTurned;
            updateCard(document.getElementById('color-input').value);
        } else if (event.key === 'ArrowRight') {
            index = Math.floor(Math.random() * 88);
            cardTurned = false;
            updateCard(document.getElementById('color-input').value);
        } else if (event.key === 'ArrowLeft') {
            index = Math.floor(Math.random() * 88);
            cardTurned = false;
            updateCard(document.getElementById('color-input').value);
        }
    });

    document.getElementById('timer-button').addEventListener('click', function () {
        toggleTimer();
    });
    
    document.getElementById('solution-button').addEventListener('click', function () {
        cardTurned = true;
        updateCard(document.getElementById('color-input').value);
        checkAnswer();
    
    });
    document.getElementById('show-answer-button').addEventListener('click', function () {
        if (cardTurned) {
            return;
        }
    
        cardTurned = true;
        updateCard(document.getElementById('color-input').value);
        checkAnswer();
    });
    document.getElementById('next-button').addEventListener('click', function () {
        index = Math.floor(Math.random() * 88);
        cardTurned = false;
        updateCard(document.getElementById('color-input').value);
        document.getElementById('answer-input').value = "";
        skipCount = 0;
        updateSkipCount();
        resetTimer();
    });
    
    function toggleTimer() {
        if (timerRunning) {
            stopTimer();
        } else {
            startTimer();
        }
    }

    document.getElementById('color-input').addEventListener('input', function () {
        updateCard(this.value);
    });

    document.getElementById('answer-input').addEventListener('input', function () {
        if (cardTurned) {
            checkAnswer();
        }
    });

    document.getElementById('solution-button').addEventListener('click', function () {
        cardTurned = true;
        updateCard(document.getElementById('color-input').value);
        checkAnswer();
        stopTimer();
    });
    
    function checkAnswer() {
        var userAnswer = document.getElementById('answer-input').value.trim().toLowerCase();
        if (userAnswer === currentAnswer.toLowerCase()) {
            score++;
            document.getElementById('score').innerText = score;
    
            document.getElementById('flashcard').style.backgroundColor = '#4CAF50';
            setTimeout(() => {
                index = Math.floor(Math.random() * 88);
                cardTurned = false;
                updateCard(document.getElementById('color-input').value);
                document.getElementById('answer-input').value = "";
                skipCount = 0;
                updateSkipCount();
                document.getElementById('flashcard').style.backgroundColor = document.getElementById('color-input').value;
            }, 500);
    
            if (score === 10) {
                stopTimer();
                alert('Congratulations! You reached a score of 10. Timer stopped.');
            }
        } else {
            document.getElementById('flashcard').style.backgroundColor = '#FF0000';
            setTimeout(() => {
                index = Math.floor(Math.random() * 88);
                cardTurned = false;
                updateCard(document.getElementById('color-input').value);
                document.getElementById('answer-input').value = "";
                skipCount++;
                updateSkipCount();
                if (skipCount >= 3) {
                    cardTurned = true;
                    updateCard(document.getElementById('color-input').value);
                    checkAnswer();
                }
    
                document.getElementById('flashcard').style.backgroundColor = document.getElementById('color-input').value;
            }, 1000);
        }
    }
    
    

    function updateSkipCount() {
        document.getElementById('skip-count').innerText = 'Skip Count: ' + skipCount;
    }
});
