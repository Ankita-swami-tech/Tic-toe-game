const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let gameBoard = Array(9).fill(null);
let gameOver = false;

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleClick(index));
});

function handleClick(index) {
    if (gameOver || gameBoard[index]) return;

    gameBoard[index] = currentPlayer;
    cells[index].innerText = currentPlayer;
    
    if (checkWin()) {
        alert(`${currentPlayer} wins!`);
        gameOver = true;
        return;
    }

    if (gameBoard.every(cell => cell)) {
        alert('It\'s a draw!');
        gameOver = true;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

resetButton.addEventListener('click', resetGame);

function resetGame() {
    gameBoard.fill(null);
    cells.forEach(cell => cell.innerText = '');
    currentPlayer = 'X';
    gameOver = false;
}

function checkWin() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameBoard[index] === currentPlayer;
        });
    });
}
