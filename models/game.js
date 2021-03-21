class Game {
    players;
    constructor(players) {
        this.players = players
    }

    changeTurn() {
        this.players.reverse()
    }

    currentPlayer() {
        return this.players[0]
    }

    nextPlayer() {
        return this.players[1]
    }
}

export default Game
