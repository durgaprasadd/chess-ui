import {BLACK, FIRST_ROW, LAST_ROW, PAWN} from "./constants";
import Piece from "./Piece";

class Pawn extends Piece {
    direction;

    constructor(row, col, type) {
        super(PAWN, row, col, type)
        this.direction = (this.type === BLACK ) ? 1 : -1
    }

    isValidMove(board, row, col, piece) {
        const isEmpty = piece.isEmpty
        return this.checkBasicValidity(piece) && (this.row + this.direction === row) && ((isEmpty && this.col === col) || (!isEmpty && Math.abs(this.col - col) === 1))
    }

    isPromoted() {
        return this.row === LAST_ROW || this.row === FIRST_ROW
    }
}

export default Pawn