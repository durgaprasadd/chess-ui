import React, {Component} from "react";
import {withRouter} from "next/router";
import {w3cwebsocket as W3CWebSocket} from "websocket";
import {AppContext} from "../context/context";
import {Profile} from "../Components/Profile";
import {Loader} from "../Components/Loader";
import styles from "../styles/Home.module.css";
import initialiseGame from "../data/initialPositions";


class MultiPlay extends Component {
    constructor(props) {
        const client = new W3CWebSocket(process.env.NEXT_PUBLIC_WS_URL);
        super(props);
        this.state = {
            client: client,
            isGame: false,
            opponent: {},
            game: initialiseGame()
        }
    }

    static contextType = AppContext

    componentWillUnmount() {
        this.state.client.close()
    }

    send(move) {
        this.state.client.send(JSON.stringify({data: this.context.data, move}))
    }

    componentDidMount() {
        this.state.client.onopen = () => {
            console.log('WebSocket Client Connected');
            this.state.client.send(JSON.stringify({data: this.context.data, move: []}))
        };
        this.state.client.onmessage = (message) => {
            const {isGame, opponent, moves} = JSON.parse(message.data)
            const {game} = this.state
            if (isGame) {
                console.log(this.context.data)
                console.log(opponent)
                game.updateDetails(this.context.data, opponent)
                game.applyMoves(moves)
            }
            this.setState({isGame, opponent, game})
        };
    }


    handleSelection(rowIndex, colIndex, e) {
        const {game} = this.state
        const move = game.handleSelection(rowIndex, colIndex)
        if (move.length !== 0) this.send(move)
        this.setState({game})
    }

    renderRow(possibleMoves, rowIndex, clickable, piece, colIndex) {
        let className = styles.box
        if ((rowIndex + colIndex) % 2 === 0) {
            className += ' ' + styles.black
        }
        if (piece.selected) {
            className += ' ' + styles.selected
        }
        let onclick = () => {
        }
        if (clickable) {
            onclick = this.handleSelection.bind(this, rowIndex, colIndex)
        }
        const isPossibleMove = possibleMoves.some(([r, c]) => rowIndex === r && colIndex === c)
        return <div id={rowIndex + " " + colIndex} className={className} onClick={onclick}>
            {isPossibleMove && <div className={styles.move}/>}
            {!piece.isEmpty && <img src={piece.type + '-' + piece.name + '.svg'} className={styles.piece}/>}
        </div>
    }

    renderGrid(possibleMoves, clickable, row, rowIndex) {
        return row.map(this.renderRow.bind(this, possibleMoves, rowIndex, clickable))
    }

    renderBoard() {
        const {game} = this.state
        const clickable = game.isValidPlayer()
        const possibleMoves = game.showPossibleMoves()
        const isMate = game.isCheckMate()
        let boardStyle = styles.board
        if(isMate) {
            boardStyle += " " + styles.mate
        }
        console.log(game.currentPlayer())
        console.log(game.nextPlayer().name)
        return <div className={boardStyle}>
            {game.board.map(this.renderGrid.bind(this, possibleMoves, clickable))}
            {isMate &&
            <div className={styles.won}>
                {game.nextPlayer().name + "  won"}
            </div>
            }
        </div>
    }

    render() {
        const {name, color, gameId} = this.context.data
        const {isGame, opponent} = this.state
        return <div>
            {
                !isGame ? <Loader gameId={gameId}/> :
                    <>
                        <Profile {...opponent} />
                        {this.renderBoard()}
                        <Profile name={name} color={color} self/>
                    </>
            }
        </div>

    }
}


export default withRouter(MultiPlay)