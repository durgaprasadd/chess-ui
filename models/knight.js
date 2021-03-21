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
}

export default Knight