import {ROOK} from "./constants";
import Piece from "./Piece";

class Rook extends Piece {
    constructor(row, col, type) {
        super(ROOK, row, col, type)
    }

    isValidMove(board, row, col, piece) {
        return this.checkBasicValidity(piece) && Rook.isValidRookMove(board, this.row, this.col, row, col)
    }

    static isValidRookMove(board, row1, col1, row2, col2) {
        return (row1 === row2 && Rook.isInBetweenRowEmpty(row1, col1, col2, board)) ||
            (col1 === col2 && Rook.isInBetweenColEmpty(col1, row1, row2, board))
    }

    static isInBetweenRowEmpty(rowIndex, prevColIndex, currColIndex, board) {
        if (prevColIndex < currColIndex) {
            let index = prevColIndex + 1
            while (index < currColIndex) {
                if (!board[rowIndex][index].isEmpty) {
                    return false;
                }
                index++
            }
            return true
        } else {
            let index = prevColIndex - 1
            while (index > currColIndex) {
                if (!board[rowIndex][index].isEmpty) {
                    return false;
                }
                index--
            }
            return true
        }
    }

    static isInBetweenColEmpty(colIndex, prevRowIndex, currRowIndex, board) {
        if (prevRowIndex < currRowIndex) {
            let index = prevRowIndex + 1
            while (index < currRowIndex) {
                if (!board[index][colIndex].isEmpty) {
                    return false;
                }
                index++
            }
            return true
        } else {
            let index = prevRowIndex - 1
            while (index > currRowIndex) {
                if (!board[index][colIndex].isEmpty) {
                    return false;
                }
                index--
            }
            return true
        }
    }
}

export default Rook