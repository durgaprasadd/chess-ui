import React, {Component} from "react";
import styles from '../styles/Home.module.css'
import pieces from '../data/initialPositions.json'

class Board extends Component{
    constructor(props) {
        super(props);
        this.state = {
            grids: this.initialBoard()
        }
    }

    initialBoard(){
        const board = new Array(8).fill(1).map(i => new Array(8).fill(1).map((j,index) => {
            return {"isEmpty": true, "piece": {}}
        }))
        pieces.forEach(piece =>
            board[piece.row][piece.col] = {"isEmpty": false, "piece": piece}
        )
        return board
    }

    renderRow(rowIndex, col, colIndex){
        let className = styles.grid
        if((rowIndex + colIndex)%2 === 0){
            className = styles.black
        }
        return <div className={className +' '+ styles.grid}>
            {!col.isEmpty && <img src={col.piece.type + '-' + col.piece.name + '.svg'} className={styles.piece}/>}
        </div>
    }

    renderGrid(row, rowIndex){
        return row.map(this.renderRow.bind(this, rowIndex))
    }

    render(){
        return <div className={styles.board}>
            {this.state.grids.map(this.renderGrid.bind(this))}
        </div>
    }
}

export default Board