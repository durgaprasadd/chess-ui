class Piece {
    name
    row;
    col;
    type;
    selected = false;
    isEmpty = false;

    constructor(name, row, col, type) {
        this.name = name
        this.col = col
        this.row = row
        this.type = type
    }

    checkBasicValidity(piece){
        return piece.isEmpty || piece.type !== this.type
    }

    move(row, col){
        this.row = row
        this.col = col
    }
}

export default Piece