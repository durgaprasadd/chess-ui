class EmptyPiece {
    isEmpty = true;
    row;
    col;
    constructor(row, col) {
        this.row = row
        this.col = col
    }
    possibleMoves() {
        return []
    }
}

export default EmptyPiece