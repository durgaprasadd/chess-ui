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
        const {selected, game} = this.state
        const piece = game.board[rowIndex][colIndex]
        const nextPlayer = game.nextPlayer()
        const currentPlayer = game.currentPlayer()
        if (!selected.isEmpty) {
            if (!selected.isValidMove(game.board, rowIndex, colIndex, piece) || !game.canMove(selected, rowIndex, colIndex)) {
                selected.selected = false
                this.setState({selected: new EmptyPiece()})
            } else {
                if (!piece.isEmpty) nextPlayer.removePiece(piece)
                game.board[selected.row][selected.col] = new EmptyPiece()
                selected.move(rowIndex, colIndex)
                selected.selected = false
                game.board[rowIndex][colIndex] = selected
                game.changeTurn()
                this.setState({selected: new EmptyPiece()})
            }
        } else if (!piece.isEmpty && piece.type === currentPlayer.type) {
            piece.selected = true
            this.setState({selected: piece})
        }
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
        const selectedPiece = this.state.game.board[src[0]][src[1]]
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
        const {selected, game} = this.state
        const possibleMoves = game.showPossibleMoves(selected)
        return <div className={styles.board}>
            {game.board.map(this.renderGrid.bind(this, possibleMoves))}
            {game.isCheckMate() && <div className={styles.won}>
                {game.nextPlayer().type + "  won"}
            </div>}
        </div>
    }
}

export default Board