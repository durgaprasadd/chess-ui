import {FIRST_COL, FIRST_ROW, LAST_COL, LAST_ROW} from "./constants";

class Piece {
    name
    row;
    col;
    type;
    selected = false;
    isEmpty = false;

    constructor(name, row, col, type) {
        this.name = name
        this.col = +col
        this.row = +row
        this.type = type
    }

    checkBasicValidity(piece){
        return piece.isEmpty || piece.type !== this.type
    }

    move(row, col){
        this.row = row
        this.col = col
    }

    isValidPosition(row, col){
        return (row >= FIRST_ROW && row <= LAST_ROW) && (col >= FIRST_COL && col <= LAST_COL)
    }

    possibleMovesInQ(board, r, c) {
        let result = []
        let row = this.row + r;
        let col = this.col + c;
        while (this.isValidPosition(row, col)) {
            let piece = board[row][col]
            if (!piece.isEmpty) {
                if (piece.type !== this.type) {
                    result.push([row, col])
                }
                break
            }
            result.push([row, col])
            row += r
            col += c
        }
        return result
    }
}

export default Piece