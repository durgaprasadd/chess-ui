import {KING} from "./constants";
import Piece from "./Piece";


class King extends Piece {
    constructor(row, col, type) {
        super(KING, row, col, type)
    }

    isValidMove(board, row, col, piece) {
        return this.checkBasicValidity(piece) && Math.abs(this.row - row) < 2 && Math.abs(this.col - col) < 2
    }

    possibleMoves(board) {
        return [-1, 0, 1]
            .reduce((acc,r) => acc.concat([-1, 0, 1].map(c => [r, c])), [])
            .map(([r, c]) => [this.row + r, this.col + c])
            .filter(([r, c]) => this.isValidPosition(r, c))
            .filter(([r, c]) => this.isValidMove(board, r, c, board[r][c]))
    }
}

Array.prototype.log = function (logger = console.log) {
    logger(this)
    return this
}
export default King