import Rook from "../models/rook";
import {BLACK, WHITE} from "../models/constants";
import Knight from "../models/knight";
import Bishop from "../models/bishop";
import Queen from "../models/queen";
import King from "../models/king";
import Pawn from "../models/pawn";
import Player from "../models/player";
import Game from "../models/game";

const initialiseGame = function () {
    const blackKing = new King(0, 4, BLACK)
    const whiteKing = new King(7, 4, WHITE)
    const blackPieces = [
        new Rook(0, 0, BLACK),
        new Knight(0, 1, BLACK),
        new Bishop(0, 2, BLACK),
        new Queen(0, 3, BLACK),
        blackKing,
        new Bishop(0, 5, BLACK),
        new Knight(0, 6, BLACK),
        new Rook(0, 7, BLACK),
        new Pawn(1, 0, BLACK),
        new Pawn(1, 1, BLACK),
        new Pawn(1, 2, BLACK),
        new Pawn(1, 3, BLACK),
        new Pawn(1, 4, BLACK),
        new Pawn(1, 5, BLACK),
        new Pawn(1, 6, BLACK),
        new Pawn(1, 7, BLACK)
    ]
    const whitePieces = [
        new Rook(7, 0, WHITE),
        new Knight(7, 1, WHITE),
        new Bishop(7, 2, WHITE),
        new Queen(7, 3, WHITE),
        whiteKing,
        new Bishop(7, 5, WHITE),
        new Knight(7, 6, WHITE),
        new Rook(7, 7, WHITE),
        new Pawn(6, 0, WHITE),
        new Pawn(6, 1, WHITE),
        new Pawn(6, 2, WHITE),
        new Pawn(6, 3, WHITE),
        new Pawn(6, 4, WHITE),
        new Pawn(6, 5, WHITE),
        new Pawn(6, 6, WHITE),
        new Pawn(6, 7, WHITE),
    ]
    const blackPlayer = new Player(BLACK, blackPieces, blackKing)
    const whitePlayer = new Player(WHITE, whitePieces, whiteKing)
    const game = new Game([whitePlayer, blackPlayer])
    return game;
}

export default initialiseGame