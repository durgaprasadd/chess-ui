import React, {Component} from "react";
import styles from '../styles/Home.module.css'
import {withRouter} from "next/router";
import {AppContext} from "../context/context";

class Join extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            gameId: "",
            isNameValid: true,
            isGameIdValid: true
        }
    }

    static contextType = AppContext

    isTextValid(text) {
        return text !== ""
    }

    handleName(e) {
        const name = e.target.value.trim()
        this.setState({name, isNameValid: this.isTextValid(name)})
    }

    handleGameId(e) {
        const gameId = e.target.value.trim()
        this.setState({gameId, isGameIdValid: this.isTextValid(gameId)})
    }

    async submit(e) {
        const {name, gameId} = this.state
        if (!this.isTextValid(name) || !this.isTextValid(gameId)) {
            this.setState({isNameValid: this.isTextValid(name), isGameIdValid: this.isTextValid(gameId)})
            return
        }

        const body = {
            name,
            gameId,
            color: "black",
        }

        const {isValid} = await fetch("https://chess-backend-js.herokuapp.com/join", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'chess-backend-js.herokuapp.com'
            },
            body: JSON.stringify(body)
        }).then(res => res.json())

        if (!isValid) {
            this.setState({isGameIdValid: false})
            return
        }

        this.context.updateData({...body, gameId, color: "black", host: false, join: true})

        await this.props.router.push({
            pathname: '/multiPlay'
        })
    }

    render() {
        const {name, gameId, isNameValid, isGameIdValid} = this.state
        return <div className={styles.host}>
            <div> Join Game</div>
            <div>
                <p>Name</p>
                <input onChange={this.handleName.bind(this)} value={name}/>
                {!isNameValid && <p className={styles.error}>Name is not valid</p>}
            </div>
            <div>
                <p>Game Id</p>
                <input onChange={this.handleGameId.bind(this)} value={gameId}/>
                {!isGameIdValid && <p className={styles.error}>Game id is not valid</p>}
            </div>
            <button onClick={this.submit.bind(this)}>Submit</button>
        </div>
    }
}


export default withRouter(Join)