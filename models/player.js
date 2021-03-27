class Player {
    type;
    pieces;
    king;
    constructor(type, pieces, king) {
        this.type = type
        this.pieces = pieces
        this.king = king
    }

    removePiece(piece) {
        this.pieces = this.pieces.filter(p => !(p.row === piece.row && p.col === piece.col))
    }

    addPiece(piece) {
        this.pieces.push(piece)
    }

    isCheck(player, board) {
        return player.pieces.some(piece => piece.isValidMove(board, this.king.row, this.king.col, this.king))
    }

    isCheckMate(player, board) {
        return this.pieces
    }
}

export default Player