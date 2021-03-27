import {KNIGHT} from "./constants";
import Piece from "./Piece";


class Knight extends Piece {
    constructor(row, col, type) {
        super(KNIGHT, row, col, type)
    }

    isValidMove(board, row, col, piece) {
        return this.checkBasicValidity(piece) && ((Math.abs(this.row - row) === 2 && Math.abs(this.col - col) === 1) ||
            (Math.abs(this.row - row) === 1 && Math.abs(this.col - col) === 2))
    }

    possibleMoves(board) {
        return [[2, -1], [2, 1], [1, 2], [-1, 2], [-2, -1], [-2, 1], [1, -2], [-1, -2]]
            .map(([r, c]) => [this.row + r, this.col + c])
            .filter(([r, c]) => this.isValidPosition(r, c))
            .filter(([r, c]) => this.isValidMove(board, r, c, board[r][c]))
    }
}

export default Knight