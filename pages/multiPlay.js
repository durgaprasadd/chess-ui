import React, {Component} from "react";
import Board from "../Components/Board";
import {withRouter} from "next/router";
import {w3cwebsocket as W3CWebSocket} from "websocket";
import {AppContext} from "../context/context";


class MultiPlay extends Component {
    constructor(props) {
        const client = new W3CWebSocket(process.env.NEXT_PUBLIC_WS_URL);
        super(props);
        this.state = {
            client: client,
            isGame: false
        }
    }

    static contextType = AppContext

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
            this.setState({isGame: JSON.parse(message.data).isGame})
        };
    }

    render() {
        const {name, color, gameId} = this.context.data
        return <div>
            <div> Name {name}</div>
            <div> Color {color}</div>
            <div> GameId {gameId}</div>
            {this.state.isGame && <Board props={this.props}/>}
        </div>

    }
}


export default withRouter(MultiPlay)