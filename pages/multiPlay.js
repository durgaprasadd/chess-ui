import React, {Component} from "react";
import Board from "../Components/Board";
import {withRouter} from "next/router";
import Cookies from 'cookies'
import cookieCutter from 'cookie-cutter'
import {w3cwebsocket as W3CWebSocket} from "websocket";
import {AppContext} from "../context/context";


class MultiPlay extends Component {
    constructor(props) {
        const client = new W3CWebSocket('ws://localhost:8000');
        super(props);
        this.state = {
            name: "hello",
            client: client,
            game: false
        }
    }

    static contextType = AppContext

    static getInitialProps({req, res}) {
        if (!req) {
            const gameId = cookieCutter.get('gameId')
            const name = cookieCutter.get('name')
            return {gameId, name}
        }
        const cookies = new Cookies(req, res)
        const gameId = cookies.get('gameId')
        const name = cookies.get('name')
        return {gameId, name}
    }

    componentWillUnmount() {
        this.state.client.close()
    }

    send() {
        this.state.client.send("something")
    }

    componentDidMount() {
        this.state.client.onopen = () => {
            console.log('WebSocket Client Connected');
            this.state.client.send(JSON.stringify(this.context.data))
        };
        this.state.client.onmessage = (message) => {
            this.setState({game: JSON.parse(message.data).isGame})
        };
    }

    render() {
        return <div>
            <div> Name {this.context.data.name}</div>
            <div> Color {this.context.data.color}</div>
            <div> GameId {this.context.data.gameId}</div>
            {this.state.game && <Board props={this.props}/>}
        </div>

    }
}


export default withRouter(MultiPlay)