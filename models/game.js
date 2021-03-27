import EmptyPiece from "./EmptyPiece";

class Game {
    players;

    constructor(players) {
        this.players = players
    }

    changeTurn() {
        this.players.reverse()
    }

    currentPlayer() {
        return this.players[0]
    }

    nextPlayer() {
        return this.players[1]
    }

    showPossibleMoves(selected, board) {
        return selected.possibleMoves(board)
            .filter(([r, c]) => this.canMove(selected, board[r][c], this.currentPlayer(), this.nextPlayer(), r, c, board))
    }

    canMove(selected, piece, currentPlayer, nextPlayer, rowIndex, colIndex, board) {
        const isEmpty = piece.isEmpty
        const row = selected.row
        const col = selected.col
        if (!isEmpty) {
            nextPlayer.removePiece(piece)
        }
        board[rowIndex][colIndex] = selected
        board[row][col] = new EmptyPiece()
        selected.move(rowIndex, colIndex)
        let result = currentPlayer.isCheck(nextPlayer, board)
        if (!isEmpty) {
            nextPlayer.addPiece(piece)
        }
        selected.move(row, col)
        board[row][col] = selected
        board[rowIndex][colIndex] = piece
        return !result
    }
}

export default Game
