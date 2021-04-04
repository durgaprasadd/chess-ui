class Player {
    type;
    pieces;
    king;
    name;
    removedPieces;
    constructor(type, pieces, king) {
        this.type = type
        this.pieces = pieces
        this.king = king
        this.removedPieces = []
    }

    updateDetails(details){
        this.name = details.name
    }

    removePiece(piece) {
        this.pieces = this.pieces.filter(p => !(p.row === piece.row && p.col === piece.col))
    }

    removePieceWithSaving(piece) {
        const foundPiece = this.pieces.find(p => (p.row === piece.row && p.col === piece.col))
        if (foundPiece !== undefined) {
            this.removedPieces.push(foundPiece)
        }
        this.pieces = this.pieces.filter(p => !(p.row === piece.row && p.col === piece.col))
    }

    addPiece(piece) {
        this.pieces.push(piece)
    }

    isCheck(player, board) {
        return player.pieces.some(piece => piece.isValidMove(board, this.king.row, this.king.col, this.king))
    }
}

export default Player