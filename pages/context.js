import React, {Component, createContext, useContext, useState} from 'react';

export const AppContext = createContext();

export class AppWrapper extends Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.setState = this.setState.bind(this)
    }

    componentDidMount() {
        this.setState(JSON.parse(window.localStorage.getItem("data") || "{}"))
    }

    render() {
        const updateData = function (x) {
            window.localStorage.setItem("data", JSON.stringify(x))
            this.setState(x)
        }
        return (
            <AppContext.Provider value={{data: this.state, updateData: updateData.bind(this)}}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}

export function useAppContext() {
    return useContext(AppContext);
}