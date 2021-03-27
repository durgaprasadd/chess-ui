import React, {Component} from "react";
import styles from '../styles/Home.module.css'
import EmptyPiece from "../models/EmptyPiece";
import initialiseGame from "../data/initialPositions";

class Board extends Component {
    constructor(props) {
        super(props);
        let game = initialiseGame()
        this.state = {
            game: game,
            board: this.initialBoard(game),
            selected: new EmptyPiece()
        }
    }

    initialBoard(game) {
        const board = new Array(8).fill(1).map(i => new Array(8).fill(1).map((j, index) => {
            return new EmptyPiece()
        }))
        game.players.forEach(player => player.pieces.forEach(piece => {
                board[piece.row][piece.col] = piece
            }
        ))
        return board
    }

    handleSelection(rowIndex, colIndex, e) {
        const {board, selected, game} = this.state
        const piece = board[rowIndex][colIndex]
        const nextPlayer = game.nextPlayer()
        const currentPlayer = game.currentPlayer()
        if (!selected.isEmpty) {
            if (!selected.isValidMove(board, rowIndex, colIndex, piece) || !this.canMove(selected, piece, currentPlayer, nextPlayer, rowIndex, colIndex, board)) {
                selected.selected = false
                this.setState({selected: new EmptyPiece()})
            } else {
                if (!piece.isEmpty) nextPlayer.removePiece(piece)
                board[selected.row][selected.col] = new EmptyPiece()
                selected.move(rowIndex, colIndex)
                selected.selected = false
                board[rowIndex][colIndex] = selected
                game.changeTurn()
                this.setState({selected: new EmptyPiece()})
            }
        } else if (!piece.isEmpty && piece.type === currentPlayer.type) {
            piece.selected = true
            this.setState({selected: piece})
        }
    }

    canMove(selected, piece, currentPlayer, nextPlayer, rowIndex, colIndex, board) {
        const isEmpty = piece.isEmpty
        const row = selected.row
        const col = selected.col
        if (!isEmpty) {
            nextPlayer.removePiece(piece)
        }
        board[rowIndex][colIndex] = selected
        board[row][col] = new EmptyPiece()
        selected.move(rowIndex, colIndex)
        let result = currentPlayer.isCheck(nextPlayer, board)
        if (!isEmpty) {
            nextPlayer.addPiece(piece)
        }
        selected.move(row, col)
        board[row][col] = selected
        board[rowIndex][colIndex] = piece
        return !result
    }

    handleDrag(e){
        e.dataTransfer.setData("id", e.target.id);
    }

    prevent(e){
        e.preventDefault()
    }

    handleDrop(e){
        e.preventDefault()
        const src = e.dataTransfer.getData("id").trim().split(" ").map(x => +x);
        const des = e.target.id.trim().split(" ").map(x => +x);
        const selectedPiece = this.state.board[src[0]][src[1]]
        if (selectedPiece.type === this.state.game.currentPlayer().type) {
            selectedPiece.selected = true
            this.state.selected = selectedPiece
            this.handleSelection(des[0], des[1], e)
        }
    }

    renderRow(possibleMoves, rowIndex, piece, colIndex) {
        let className = styles.box
        if ((rowIndex + colIndex) % 2 === 0) {
            className += ' ' + styles.black
        }
        if (piece.selected) {
            className += ' ' + styles.selected
        }
        const isPossibleMove = possibleMoves.some(([r,c]) => rowIndex === r && colIndex === c)
        return <div id={rowIndex + " " + colIndex} onDrop={this.handleDrop.bind(this)} onDragOver={this.prevent} className={className} onClick={this.handleSelection.bind(this, rowIndex, colIndex)}>
            {isPossibleMove && <div className={styles.move} />}
            {!piece.isEmpty && <img id={rowIndex + " " + colIndex} src={piece.type + '-' + piece.name + '.svg'}  draggable onDragStart={this.handleDrag} className={styles.piece}/>}
        </div>
    }

    renderGrid(possibleMoves, row, rowIndex) {
        return row.map(this.renderRow.bind(this,possibleMoves, rowIndex))
    }

    render() {
        const {board, selected, game} = this.state
        const possibleMoves = game.showPossibleMoves(selected, board)
        return <div className={styles.board}>
            {board.map(this.renderGrid.bind(this, possibleMoves))}
        </div>
    }
}

export default Board