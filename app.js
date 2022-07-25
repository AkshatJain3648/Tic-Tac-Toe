// GAME VARIABLES
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
let cells = document.getElementsByClassName('cell')
let circleTurn
const winningMessage = document.getElementById('winningMessage')
const winningMessageTextElement = document.getElementById('winningMessageText')
let restartBtn = document.getElementById('restartBtn')


//COMBINATIONS
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

//Starting the game 
startGame()

//Restarting the game
restartBtn.addEventListener('click', restartGame)

function startGame() {
    circleTurn = false

    //Array.from helps in converting a cell like object to an array format for forEach function 
    Array.from(cells).forEach(cell => {
        cell.addEventListener('click', hanldeClick)
    })
}

function restartGame(){
    //Reseting everytihng after finsihing the game

    //Removing the winning message
    winningMessage.classList.remove('show')

    //Removing all the marks
    Array.from(cells).forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
    })
}

//Handling clicks 
function hanldeClick(e) {
    const cell = e.target

    //Checking which class should be applied to the cell for changing the turn 
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS

    placeMark(cell, currentClass)
    switchTurns()

    // Place mark
    function placeMark(cell, currentClass) {
        cell.classList.add(currentClass)
    }

    //Checking Win or Draw
    if (checkWin(currentClass)) {
        endGame(false)
    } if (isDraw()) {
        endGame(true)
    }

    // Function to execute code after finishing the match
    function endGame(draw) {
        if (draw) {
            winningMessageTextElement.innerText = `DRAW`
        } else {
            winningMessageTextElement.innerText = `${circleTurn ? "X's" : "O's"} WON`
        }

        winningMessage.classList.add('show')
    }

    // Check for draw
    function isDraw() {
        return [...cells].every(cell => {
            return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
        })
    }

    // Check for win
    function checkWin(currentClass) {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return cells[index].classList.contains(currentClass)
            })
        })
    }

    // Switch turns
    function switchTurns() {
        circleTurn = !circleTurn
    }
}