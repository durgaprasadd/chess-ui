import {KING} from "./constants";
import Piece from "./Piece";


class King extends Piece {
    constructor(row, col, type) {
        super(KING, row, col, type)
    }

    isValidMove(board, row, col, piece) {
        return this.checkBasicValidity(piece) && Math.abs(this.row - row) < 2 && Math.abs(this.col - col) < 2
    }
}

export default King