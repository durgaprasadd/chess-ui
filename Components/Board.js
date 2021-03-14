import React, {Component} from "react";
import styles from '../styles/Home.module.css'
import pieces from '../data/initialPositions.json'

class Board extends Component{
    constructor(props) {
        super(props);
        this.state = {
            grids: this.initialBoard(),
            selected: false,
            selectedRow: 0,
            selectedCol: 0,
            turn: "white"
        }
    }

    initialBoard(){
        const board = new Array(8).fill(1).map(i => new Array(8).fill(1).map((j,index) => {
            return {"isEmpty": true, "piece": {}, "selected": false, "move": {}}
        }))
        pieces.forEach(piece => {
            let func = {}
            if (piece.name === "pawn"){
                if (piece.type === "black"){
                    func = this.blackPawnMove.bind(this)
                }else {
                    func = this.whitePawnMove.bind(this)
                }
            }
            if(piece.name === "rook"){
                func = this.rookMove.bind(this)
            }
            if(piece.name === "bishop"){
                func = this.bishopMove.bind(this)
            }
            if(piece.name === "knight"){
                func = this.knightMove.bind(this)
            }
            if(piece.name === "queen"){
                func = this.queenMove.bind(this)
            }
            if(piece.name === "king"){
                func = this.kingMove.bind(this)
            }
                board[piece.row][piece.col] = {"isEmpty": false, "piece": piece, "selected": false, "move": func}
            }
        )
        return board
    }

    changeTurn(turn){
        if (turn === "black"){
            return "white"
        }
        return "black"
    }

    blackPawnMove(prevRowIndex, prevColIndex, currRowIndex, currColIndex){
        const isEmpty = this.state.grids[currRowIndex][currColIndex].isEmpty
        return prevRowIndex + 1 === currRowIndex && ((isEmpty && prevColIndex === currColIndex) || (!isEmpty && Math.abs(prevColIndex-currColIndex) ===1))
    }

    whitePawnMove(prevRowIndex, prevColIndex, currRowIndex, currColIndex){
        const isEmpty = this.state.grids[currRowIndex][currColIndex].isEmpty
        return prevRowIndex- 1 === currRowIndex && ((isEmpty && prevColIndex === currColIndex) || (!isEmpty && Math.abs(prevColIndex-currColIndex) ===1))
    }

    queenMove(prevRowIndex, prevColIndex, currRowIndex, currColIndex) {
        return this.rookMove(prevRowIndex, prevColIndex, currRowIndex, currColIndex) ||
            this.bishopMove(prevRowIndex, prevColIndex, currRowIndex, currColIndex)
    }

    kingMove(prevRowIndex, prevColIndex, currRowIndex, currColIndex) {
        return Math.abs(prevRowIndex - currRowIndex) < 2 &&  Math.abs(prevColIndex - currColIndex) < 2
    }

    rookMove(prevRowIndex, prevColIndex, currRowIndex, currColIndex){
        return (prevRowIndex === currRowIndex && this.isInBetweenRowEmpty(prevRowIndex,prevColIndex, currColIndex)) ||
            (prevColIndex === currColIndex && this.isInBetweenColEmpty(prevColIndex,prevRowIndex, currRowIndex))
    }

    bishopMove(prevRowIndex, prevColIndex, currRowIndex, currColIndex){
        return Math.abs(prevRowIndex - currRowIndex) === Math.abs(prevColIndex - currColIndex) && this.isInBetweenDiagonalEmpty(prevRowIndex, prevColIndex, currRowIndex, currColIndex)
    }

    knightMove(prevRowIndex, prevColIndex, currRowIndex, currColIndex){
        return (Math.abs(prevRowIndex - currRowIndex) === 2 && Math.abs(prevColIndex - currColIndex) === 1) ||
            (Math.abs(prevRowIndex - currRowIndex) === 1 && Math.abs(prevColIndex - currColIndex) === 2)
    }

    isInBetweenDiagonalEmpty(prevRowIndex, prevColIndex, currRowIndex, currColIndex){
        if(prevRowIndex < currRowIndex){
            if (prevColIndex < currColIndex){
                let rowIndex = prevRowIndex + 1
                let colIndex = prevColIndex + 1
                while (colIndex < currColIndex){
                    if(!this.state.grids[rowIndex][colIndex].isEmpty){
                        return false
                    }
                    rowIndex++
                    colIndex++
                }
                return true
            } else {
                let rowIndex = prevRowIndex + 1
                let colIndex = prevColIndex - 1
                while (colIndex > currColIndex){
                    if(!this.state.grids[rowIndex][colIndex].isEmpty){
                        return false
                    }
                    rowIndex++
                    colIndex--
                }
                return true
            }
        } else {
            if (prevColIndex < currColIndex){
                let rowIndex = prevRowIndex - 1
                let colIndex = prevColIndex + 1
                while (colIndex < currColIndex){
                    if(!this.state.grids[rowIndex][colIndex].isEmpty){
                        return false
                    }
                    rowIndex--
                    colIndex++
                }
                return true
            } else {
                let rowIndex = prevRowIndex - 1
                let colIndex = prevColIndex - 1
                while (colIndex > currColIndex){
                    if(!this.state.grids[rowIndex][colIndex].isEmpty){
                        return false
                    }
                    rowIndex--
                    colIndex--
                }
                return true
            }
        }
    }

    isInBetweenRowEmpty(rowIndex,prevColIndex, currColIndex) {
        if(prevColIndex < currColIndex){
            let index = prevColIndex + 1
            while (index < currColIndex){
                if(!this.state.grids[rowIndex][index].isEmpty){
                    return false;
                }
                index++
            }
            return true
        }else {
            let index = prevColIndex - 1
            while (index > currColIndex){
                if(!this.state.grids[rowIndex][index].isEmpty){
                    return false;
                }
                index--
            }
            return true
        }
    }

    isInBetweenColEmpty(colIndex,prevRowIndex, currRowIndex) {
        if(prevRowIndex < currRowIndex){
            let index = prevRowIndex + 1
            while (index < currRowIndex){
                if(!this.state.grids[index][colIndex].isEmpty){
                    return false;
                }
                index++
            }
            return true
        }else {
            let index = prevRowIndex - 1
            while (index > currRowIndex){
                if(!this.state.grids[index][colIndex].isEmpty){
                    return false;
                }
                index--
            }
            return true
        }
    }

    isSameSelection(rowIndex, colIndex){
        return this.state.selectedRow === rowIndex && this.state.selectedCol === colIndex
    }

    isSameType(rowIndex, colIndex){
        return !this.state.grids[rowIndex][colIndex].isEmpty && this.state.grids[rowIndex][colIndex].piece.type === this.state.grids[this.state.selectedRow][this.state.selectedCol].piece.type
    }
    isValidSelection(rowIndex, colIndex){
        const {selectedRow, selectedCol} = this.state
        return !this.isSameSelection(rowIndex, colIndex) && !this.isSameType(rowIndex, colIndex) && this.state.grids[selectedRow][selectedCol].move(selectedRow, selectedCol, rowIndex, colIndex)
    }

    handleSelection(rowIndex, colIndex, e){
        console.log(this.state)
        let grid = this.state.grids[rowIndex][colIndex]
        console.log(grid)
        if(this.state.selected){
            if(!this.isValidSelection(rowIndex, colIndex)){
                this.setState(state => {
                    state.grids[this.state.selectedRow][this.state.selectedCol].selected = false
                    return {selected: false}
                })
            } else {
                this.setState(state => {
                    this.state.grids[this.state.selectedRow][this.state.selectedCol].selected = false
                    state.grids[rowIndex][colIndex] = this.state.grids[this.state.selectedRow][this.state.selectedCol]
                    this.state.grids[this.state.selectedRow][this.state.selectedCol] = {
                        "isEmpty" : true
                    }
                    return {selected: false, turn: this.changeTurn(this.state.turn)}
                })
            }
        }else if (!grid.isEmpty && grid.piece.type === this.state.turn) {
            this.setState(state => {
                    state.grids[rowIndex][colIndex].selected = true
                    return {
                        selected: true,
                        selectedRow: rowIndex,
                        selectedCol: colIndex
                    }
                }
            )
        }
    }

    renderRow(rowIndex, col, colIndex){
        let className = styles.grid
        if((rowIndex + colIndex)%2 === 0){
            className += ' ' + styles.black
        }
        if (col.selected){
            className += ' '+ styles.selected
        }
        return <div className={className} onClick={this.handleSelection.bind(this, rowIndex, colIndex)}>
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