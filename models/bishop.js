import {BISHOP, FIRST_COL, FIRST_ROW, LAST_COL, LAST_ROW} from "./constants";
import Piece from "./Piece";


class Bishop extends Piece {
    constructor(row, col, type) {
        super(BISHOP, row, col, type)
    }

    isValidMove(board, row, col, piece) {
        return this.checkBasicValidity(piece) && Bishop.isValidBishopMove(board, this.row, this.col, row, col)

    }

    possibleMoves(board) {
        return [[1, 1], [1, -1], [-1, 1], [-1, -1]].flatMap(([r, c]) => this.possibleMovesInQ(board, r, c))
    }

    possibleMovesInQ1(board) {
        let result = []
        let row = this.row - 1;
        let col = this.col - 1;
        while (row >= FIRST_ROW && col >= FIRST_COL) {
            let piece = board[row][col]
            if (!piece.isEmpty) {
                if (piece.type !== this.type) {
                    result.push([row, col])
                }
                break
            }
            result.push([row, col])
            row--
            col--
        }
        return result
    }

    possibleMovesInQ2(board) {
        let result = []
        let row = this.row - 1;
        let col = this.col + 1;
        while (row >= FIRST_ROW && col <= LAST_COL) {
            let piece = board[row][col]
            if (!piece.isEmpty) {
                if (piece.type !== this.type) {
                    result.push([row, col])
                }
                break
            }
            result.push([row, col])
            row--
            col++
        }
        return result
    }

    possibleMovesInQ3(board) {
        let result = []
        let row = this.row + 1;
        let col = this.col + 1;
        while (row <= LAST_ROW && col <= LAST_COL) {
            let piece = board[row][col]
            if (!piece.isEmpty) {
                if (piece.type !== this.type) {
                    result.push([row, col])
                }
                break
            }
            result.push([row, col])
            row++
            col++
        }
        return result
    }

    possibleMovesInQ4(board) {
        let result = []
        let row = this.row + 1;
        let col = this.col - 1;
        while (row <= LAST_ROW && col >= FIRST_COL) {
            let piece = board[row][col]
            if (!piece.isEmpty) {
                if (piece.type !== this.type) {
                    result.push([row, col])
                }
                break
            }
            result.push([row, col])
            row++
            col--
        }
        return result
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