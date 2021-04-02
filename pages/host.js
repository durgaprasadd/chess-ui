import React, {Component} from "react";
import styles from '../styles/Home.module.css'
import {withRouter} from "next/router";
import {AppContext} from "../context/context";

class Host extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            color: "white",
            isNameValid: true
        }
    }

    static contextType = AppContext

    isNameValid(name) {
        return name !== ""
    }

    handleName(e) {
        const name = e.target.value.trim()
        this.setState({name, isNameValid: this.isNameValid(name)})
    }

    handleColor(e) {
        this.setState({color: e.target.value})
    }

    async submit(e) {
        const {name, color} = this.state
        if (!this.isNameValid(name)) {
            this.setState({isNameValid: this.isNameValid(name)})
            return
        }
        const body = {name, color}
        const {gameId, type} = await fetch("https://chess-backend-js.herokuapp.com/host", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
        this.context.updateData({...body, gameId, color: type, host: true, join: false})
        await this.props.router.push({
            pathname: '/multiPlay'
        })
    }

    render() {
        const {name, color, isNameValid} = this.state
        return <div className={styles.host}>
            <div> Host Game</div>
            <div>
                <p>Name</p>
                <input onChange={this.handleName.bind(this)} value={name}/>
                {!isNameValid && <p className={styles.error}>Name is not valid</p>}
            </div>
            <div>
                <p>Color</p>
                <select name="color" onInput={this.handleColor.bind(this)} value={color}>
                    <option value="white">White</option>
                    <option value="black">Black</option>
                    <option value="random">Random</option>
                </select>
            </div>
            <button onClick={this.submit.bind(this)}>Submit</button>
        </div>
    }
}

export default withRouter(Host)