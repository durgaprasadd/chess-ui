import {BISHOP} from "./constants";
import Piece from "./Piece";


class Bishop extends Piece {
    constructor(row, col, type) {
        super(BISHOP, row, col, type)
    }

    isValidMove(board, row, col, piece) {
        return this.checkBasicValidity(piece) && Bishop.isValidBishopMove(board, this.row, this.col, row, col)

    }

    static isValidBishopMove(board, row1, col1, row2, col2) {
        return Math.abs(row1 - row2) === Math.abs(col1 - col2) &&
            Bishop.isInBetweenDiagonalEmpty(row1, col1, row2, col2, board)
    }

    static isInBetweenDiagonalEmpty(prevRowIndex, prevColIndex, currRowIndex, currColIndex, board) {
        if (prevRowIndex < currRowIndex) {
            if (prevColIndex < currColIndex) {
                let rowIndex = prevRowIndex + 1
                let colIndex = prevColIndex + 1
                while (colIndex < currColIndex) {
                    if (!board[rowIndex][colIndex].isEmpty) {
                        return false
                    }
                    rowIndex++
                    colIndex++
                }
                return true
            } else {
                let rowIndex = prevRowIndex + 1
                let colIndex = prevColIndex - 1
                while (colIndex > currColIndex) {
                    if (!board[rowIndex][colIndex].isEmpty) {
                        return false
                    }
                    rowIndex++
                    colIndex--
                }
                return true
            }
        } else {
            if (prevColIndex < currColIndex) {
                let rowIndex = prevRowIndex - 1
                let colIndex = prevColIndex + 1
                while (colIndex < currColIndex) {
                    if (!board[rowIndex][colIndex].isEmpty) {
                        return false
                    }
                    rowIndex--
                    colIndex++
                }
                return true
            } else {
                let rowIndex = prevRowIndex - 1
                let colIndex = prevColIndex - 1
                while (colIndex > currColIndex) {
                    if (!board[rowIndex][colIndex].isEmpty) {
                        return false
                    }
                    rowIndex--
                    colIndex--
                }
                return true
            }
        }
    }
}

export default Bishop