import React, {Component} from "react";
import {withRouter} from "next/router";
import {w3cwebsocket as W3CWebSocket} from "websocket";
import {AppContext} from "../context/context";
import {Profile} from "../Components/Profile";
import {Loader} from "../Components/Loader";
import Board from "../Components/Board";


class MultiPlay extends Component {
    constructor(props) {
        const client = new W3CWebSocket(process.env.NEXT_PUBLIC_WS_URL);
        super(props);
        this.state = {
            client: client,
            isGame: false,
            opponent: {}
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
            const {isGame, opponent} = JSON.parse(message.data)
            this.setState({isGame, opponent})
        };
    }

    render() {
        const {name, color, gameId} = this.context.data
        const {isGame, opponent} = this.state
        console.log(gameId)
        console.log(opponent)
        return <div>
            {
                !isGame ? <Loader gameId={gameId}/> :
                    <><Profile {...opponent} />
                        <Board props={this.props}/>
                        <Profile name={name} color={color} self/>
                    </>
            }
        </div>

    }
}


export default withRouter(MultiPlay)