import React, {Component} from "react";
import styles from '../styles/Home.module.css'
import pieces from '../data/initialPositions.js'
import EmptyPiece from "../models/EmptyPiece";
import {BLACK, WHITE} from "../models/constants";

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: this.initialBoard(),
            selected: new EmptyPiece(),
            turn: "white"
        }
    }

    initialBoard() {
        const board = new Array(8).fill(1).map(i => new Array(8).fill(1).map((j, index) => {
            return new EmptyPiece()
        }))
        pieces.forEach(piece => {
                board[piece.row][piece.col] = piece.piece
            }
        )
        return board
    }

    changeTurn(turn) {
        if (turn === BLACK) {
            return WHITE
        }
        return BLACK
    }

    handleSelection(rowIndex, colIndex, e) {
        const {board, selected, turn} = this.state
        let piece = board[rowIndex][colIndex]
        if (!selected.isEmpty) {
            if (!selected.isValidMove(board, rowIndex, colIndex, piece)) {
                selected.selected = false
                this.setState({selected: new EmptyPiece()})
            } else {
                board[selected.row][selected.col] = new EmptyPiece()
                selected.move(rowIndex, colIndex)
                selected.selected = false
                board[rowIndex][colIndex] = selected
                this.setState({selected: new EmptyPiece(), turn: this.changeTurn(turn)})
            }
        } else if (!piece.isEmpty && piece.type === turn) {
            piece.selected = true
            this.setState({selected: piece})
        }
    }

    renderRow(rowIndex, piece, colIndex) {
        let className = styles.box
        if ((rowIndex + colIndex) % 2 === 0) {
            className += ' ' + styles.black
        }
        if (piece.selected) {
            className += ' ' + styles.selected
        }
        return <div className={className} onClick={this.handleSelection.bind(this, rowIndex, colIndex)}>
            {!piece.isEmpty && <img src={piece.type + '-' + piece.name + '.svg'} className={styles.piece}/>}
        </div>
    }

    renderGrid(row, rowIndex) {
        return row.map(this.renderRow.bind(this, rowIndex))
    }

    render() {
        return <div className={styles.board}>
            {this.state.board.map(this.renderGrid.bind(this))}
        </div>
    }
}

export default Board