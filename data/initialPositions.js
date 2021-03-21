import Rook from "../models/rook";
import {BLACK, WHITE} from "../models/constants";
import Knight from "../models/knight";
import Bishop from "../models/bishop";
import Queen from "../models/queen";
import King from "../models/king";
import Pawn from "../models/pawn";

export default [
    {
        "row": 0,
        "col": 0,
        "piece": new Rook(0, 0, BLACK)
    },
    {
        "row": 0,
        "col": 1,
        "piece": new Knight(0, 1, BLACK)
    },
    {
        "row": 0,
        "col": 2,
        "piece": new Bishop(0, 2, BLACK)
    },
    {
        "row": 0,
        "col": 3,
        "piece": new Queen(0, 3, BLACK)
    },
    {
        "row": 0,
        "col": 4,
        "piece": new King(0, 4, BLACK)
    },
    {
        "row": 0,
        "col": 5,
        "piece": new Bishop(0, 5, BLACK)
    },
    {
        "row": 0,
        "col": 6,
        "piece": new Knight(0, 6, BLACK)
    },
    {
        "row": 0,
        "col": 7,
        "piece": new Rook(0, 7, BLACK)
    },
    {
        "row": 1,
        "col": 0,
        "piece": new Pawn(1, 0, BLACK)
    },
    {
        "row": 1,
        "col": 1,
        "piece": new Pawn(1, 1, BLACK)
    },
    {
        "row": 1,
        "col": 2,
        "piece": new Pawn(1, 2, BLACK)
    },
    {
        "row": 1,
        "col": 3,
        "piece": new Pawn(1, 3, BLACK)
    },
    {
        "row": 1,
        "col": 4,
        "piece": new Pawn(1, 4, BLACK)
    },
    {
        "row": 1,
        "col": 5,
        "piece": new Pawn(1, 5, BLACK)
    },
    {
        "row": 1,
        "col": 6,
        "piece": new Pawn(1, 6, BLACK)
    },
    {
        "row": 1,
        "col": 7,
        "piece": new Pawn(1, 7, BLACK)
    },
    {
        "row": 7,
        "col": 0,
        "piece": new Rook(7, 0, WHITE)
    },
    {
        "row": 7,
        "col": 1,
        "piece": new Knight(7, 1, WHITE)
    },
    {
        "row": 7,
        "col": 2,
        "piece": new Bishop(7, 2, WHITE)
    },
    {
        "row": 7,
        "col": 3,
        "piece": new Queen(7, 3, WHITE)
    },
    {
        "row": 7,
        "col": 4,
        "piece": new King(7, 4, WHITE)
    },
    {
        "row": 7,
        "col": 5,
        "piece": new Bishop(7, 5, WHITE)
    },
    {
        "row": 7,
        "col": 6,
        "piece": new Knight(7, 6, WHITE)
    },
    {
        "row": 7,
        "col": 7,
        "piece": new Rook(7, 7, WHITE)
    },
    {
        "row": 6,
        "col": 0,
        "piece": new Pawn(6, 0, WHITE)
    },
    {
        "row": 6,
        "col": 1,
        "piece": new Pawn(6, 1, WHITE)
    },
    {
        "row": 6,
        "col": 2,
        "piece": new Pawn(6, 2, WHITE)
    },
    {
        "row": 6,
        "col": 3,
        "piece": new Pawn(6, 3, WHITE)
    },
    {
        "row": 6,
        "col": 4,
        "piece": new Pawn(6, 4, WHITE)
    },
    {
        "row": 6,
        "col": 5,
        "piece": new Pawn(6, 5, WHITE)
    },
    {
        "row": 6,
        "col": 6,
        "piece": new Pawn(6, 6, WHITE)
    },
    {
        "row": 6,
        "col": 7,
        "piece": new Pawn(6, 7, WHITE)
    }
]