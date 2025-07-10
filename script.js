const StartBtn = document.querySelector(".start-game");


function startGame() {
    const words = ["javascript", "hangman", "coding", "challenge"];
    const randomWord = words[Math.floor(Math.random() * words.length)];
    let guessedLetters = [];
    let attemptsLeft = 6;  
}

function updateDisplay() {
    const wordDisplay = document.querySelector(".word-display");
    const attemptsDisplay = document.querySelector(".attempts-left");
    
    wordDisplay.innerHTML = randomWord.split("").map(letter => 
        guessedLetters.includes(letter) ? letter : "_"
    ).join(" ");
    
    attemptsDisplay.textContent = `Attempts left: ${attemptsLeft}`;
}  



