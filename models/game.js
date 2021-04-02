import EmptyPiece from "./EmptyPiece";

class Game {
    players;
    board;

    constructor(players) {
        this.players = players
        this.board = this.initialBoard()
    }

    initialBoard() {
        const board = new Array(8).fill(1).map(i => new Array(8).fill(1).map((j, index) => {
            return new EmptyPiece()
        }))
        this.players.forEach(player => player.pieces.forEach(piece => {
                board[piece.row][piece.col] = piece
            }
        ))
        return board
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

    showPossibleMoves(selected) {
        return selected.possibleMoves(this.board)
            .filter(([r, c]) => this.canMove(selected, r, c, this.board))
    }

    isCheckMate() {
        return !this.currentPlayer().pieces.some(piece => {
                return piece.possibleMoves(this.board).some(([r, c]) =>
                    this.canMove(piece, r, c, this.board)
                )
            }
        )
    }

    canMove(selected, rowIndex, colIndex) {
        const nextPlayer = this.nextPlayer()
        const currentPlayer = this.currentPlayer()
        const piece = this.board[rowIndex][colIndex]
        const isEmpty = piece.isEmpty
        const row = selected.row
        const col = selected.col
        if (!isEmpty) {
            nextPlayer.removePiece(piece)
        }
        this.board[rowIndex][colIndex] = selected
        this.board[row][col] = new EmptyPiece()
        selected.move(rowIndex, colIndex)
        let result = currentPlayer.isCheck(nextPlayer, this.board)
        if (!isEmpty) {
            nextPlayer.addPiece(piece)
        }
        selected.move(row, col)
        this.board[row][col] = selected
        this.board[rowIndex][colIndex] = piece
        return !result
    }
}

export default Game
