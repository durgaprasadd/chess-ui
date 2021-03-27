import {BLACK, FIRST_ROW, LAST_ROW, PAWN} from "./constants";
import Piece from "./Piece";

class Pawn extends Piece {
    direction;

    constructor(row, col, type) {
        super(PAWN, row, col, type)
        this.direction = (this.type === BLACK) ? 1 : -1
    }

    isValidMove(board, row, col, piece) {
        const isEmpty = piece.isEmpty
        return this.checkBasicValidity(piece) && (this.row + this.direction === row) && ((isEmpty && this.col === col) || (!isEmpty && Math.abs(this.col - col) === 1))
    }

    possibleMoves(board) {
        return [-1, 0, 1]
            .map(c => [this.row + this.direction, this.col + c])
            .filter(([r,c]) => this.isValidPosition(r,c))
            .filter(([r,c]) => this.isValidMove(board, r, c, board[r][c]))
    }

    isPromoted() {
        return this.row === LAST_ROW || this.row === FIRST_ROW
    }
}

export default Pawn