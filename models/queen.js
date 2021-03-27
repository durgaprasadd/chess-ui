import {QUEEN} from "./constants";
import Rook from "./rook";
import Bishop from "./bishop";
import Piece from "./Piece";

class Queen extends Piece {
    constructor(row, col, type) {
        super(QUEEN, row, col, type)
    }

    isValidMove(board, row, col, piece) {
        return this.checkBasicValidity(piece) &&
            (Rook.isValidRookMove(board, this.row, this.col, row, col) ||
                Bishop.isValidBishopMove(board, this.row, this.col, row, col))
    }

    possibleMoves(board) {
        return [[1, 0], [-1, 0], [0, 1], [0, -1],[1, 1], [1, -1], [-1, 1], [-1, -1]].flatMap(([r, c]) => this.possibleMovesInQ(board, r, c))
    }
}

export default Queen