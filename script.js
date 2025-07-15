/*-------------- Constants -------------*/
const alphabetList = 'abcdefghijklmnopqrstuvwxyz'.split('')
const gameWordsList = ['code', 'hangman', 'variable', 'function', 'javascript']
const maxWrong = 6

/*---------- State Variables ---------*/
let currentWord = ''
let guessedLetters = []
let wrongGuesses = ''

/*----- Cached Element References  -----*/
const startBtn = document.getElementById('start-btn')
const wordContainer = document.getElementById('word-container')
const lettersContainer = document.getElementById('letters-container')
const hangmanContainer = document.getElementById('hangman-container')
const popup = document.getElementById('popup')
const popupMessage = document.getElementById('popup-message')
const playAgainBtn = document.getElementById('play-again-btn')

// to grab all the hangman parts
const hangmanParts = [
    document.getElementById('hangman-head'),
    document.getElementById('hangman-body'),
    document.getElementById('hangman-right-arm'),
    document.getElementById('hangman-left-arm'),
    document.getElementById('hangman-right-leg'),
    document.getElementById('hangman-left-leg'),
]

/*-------------- Functions -------------*/

// start or restart the game
function startGame() {
    currentWord = gameWordsList[Math.floor(Math.random() * gameWordsList.length)]
    guessedLetters = []
    wrongGuesses = 0
    hidePopup()

    // hide all hangman parts
    hangmanParts.forEach(part => part.classList.add('hidden'))
    renderWord()
    renderLetters()
    updateHangmanWordGuess()
}

// draw underscores & revealed letters
function renderWord() {
    const display = currentWord.split('').map(letter => guessedLetters.includes(letter) ? letter : '_').join(' ')
    wordContainer.textContent = display
}
// render all buttons
function renderLetters() {
    lettersContainer.innerHTML = ''
    alphabetList.forEach(letter => {
        const btn = document.createElement('button')
        btn.className = 'btn btn-secondary m-1'
        btn.textContent = letter
        btn.disabled = false
        btn.addEventListener('click', () => letterGuess(letter, btn))
        lettersContainer.appendChild(btn)
    })
}

function letterGuess(letter, buttonEl) {
    buttonEl.disabled = true
    if (currentWord.includes(letter)) {
        guessedLetters.push(letter)
        renderWord()
    } else {
        wrongGuesses++
        if (wrongGuesses <= hangmanParts.length) {
            hangmanParts[wrongGuesses - 1].classList.remove('hidden')
        }
        updateHangmanWordGuess()
    }
    checkEndGame()
}
// textcounter update
function updateHangmanWordGuess() {
    hangmanContainer.textContent = `Wrong guesses: ${wrongGuesses} / ${maxWrong}`
}
// win/lose detection
function checkEndGame() {
    if (!wordContainer.textContent.includes('_')) {
        disableAllLetters()
        showPopup(' You Win! ')
    }
    else if (wrongGuesses >= maxWrong) {
        disableAllLetters()
        showPopup(` You Lose! The word was ${currentWord}`)
    }
}

// turn off all letters from being used
function disableAllLetters() {
    lettersContainer.querySelectorAll('button').forEach(btn => btn.disabled = true)
}

// show win/lose popup or hide it
function showPopup(message) {
    popupMessage.textContent = message
    popup.classList.remove('hidden')
}
function hidePopup() {
    popup.classList.add('hidden')
}

/*----------- Event Listeners ----------*/
startBtn.addEventListener('click', startGame)
playAgainBtn.addEventListener('click', startGame)
/*----------- Event Listeners ----------*/
startGame()

// formatted with the format button 