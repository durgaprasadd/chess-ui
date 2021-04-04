import EmptyPiece from "./EmptyPiece";
import {BLACK} from "./constants";

class Game {
    players;
    board;
    selected;
    isUpdatedDetails;
    self;
    moves;

    constructor(players) {
        this.players = players
        this.board = this.initialBoard()
        this.selected = new EmptyPiece()
        this.isUpdatedDetails = false
        this.moves = []
    }

    updateDetails(selfDetails, opponentDetails) {
        if (!this.isUpdatedDetails) {
            const selfPlayer = this.players.find(player => player.type === selfDetails.color)
            selfPlayer && selfPlayer.updateDetails(selfDetails)
            this.self = selfDetails.color
            const opponentPlayer = this.players.find(player => player.type === opponentDetails.color)
            opponentPlayer && opponentPlayer.updateDetails(opponentDetails)
        }
        this.isUpdatedDetails = true
    }

    getPlayer(type) {
        return this.players.find(player => player.type === type)
    }

    applyMove(move) {
        const [from, to] = move
        const piece = this.board[to[0]][to[1]]
        if (!piece.isEmpty) this.getPlayer(piece.type).removePieceWithSaving(piece)
        const movedPiece = this.board[from[0]][from[1]]
        this.board[to[0]][to[1]] = movedPiece
        movedPiece.move(to[0], to[1])
        this.board[from[0]][from[1]] = new EmptyPiece(from[0],from[1])
        this.moves.push(move)
        this.changeTurn()
    }

    applyMoves(moves) {
        if (!moves || moves.length === 0) {
            return
        }
        moves.slice(this.moves.length).forEach(this.applyMove.bind(this))
    }

    initialBoard() {
        const board = new Array(8).fill(1).map((i,row) => new Array(8).fill(1).map((j, col) => {
            return new EmptyPiece(row, col)
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

    isValidPlayer() {
        return this.currentPlayer().type === this.self
    }

    showPossibleMoves(piece = this.selected) {
        return piece.possibleMoves(this.board)
            .filter(([r, c]) => this.canMove(piece, r, c, this.board))
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
        this.board[row][col] = new EmptyPiece(row, col)
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


    handleSelection(rowIndex, colIndex) {
        const piece = this.board[rowIndex][colIndex]
        const nextPlayer = this.nextPlayer()
        const currentPlayer = this.currentPlayer()
        if (!this.selected.isEmpty) {
            if (!this.selected.isValidMove(this.board, rowIndex, colIndex, piece) || !this.canMove(this.selected, rowIndex, colIndex)) {
                this.selected.selected = false
                this.selected = new EmptyPiece()
                return []
            } else {
                if (!piece.isEmpty) nextPlayer.removePieceWithSaving(piece)
                const move = [[this.selected.row, this.selected.col], [rowIndex, colIndex]]
                this.board[this.selected.row][this.selected.col] = new EmptyPiece(this.selected.row, this.selected.col)
                this.selected.move(rowIndex, colIndex)
                this.selected.selected = false
                this.board[rowIndex][colIndex] = this.selected
                this.changeTurn()
                this.moves.push(move)
                this.selected = new EmptyPiece()
                return move
            }
        } else if (!piece.isEmpty && piece.type === currentPlayer.type && this.showPossibleMoves(piece).length !== 0) {
            piece.selected = true
            this.selected = piece
            return [];
        }
        return [];
    }

    getPlayerBoard() {
        if(this.self === BLACK){
            return this.board.slice().reverse()
        }
        return this.board
    }

    getOpponentRemovedPieces() {
        return this.players.find(player => player.type !== this.self).removedPieces
    }

    getSelfRemovedPieces() {
        return this.players.find(player => player.type === this.self).removedPieces
    }
}

export default Game
