import React, {Component} from "react";
import Board from "../Components/Board";

class Play extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return <Board props={this.props}/>
    }
}


export default function (props){
    return new Play(props)
}