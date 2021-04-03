import React, {Component} from "react";
import styles from "../styles/Loader.module.css"

export class Loader extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className={styles.loaderPage}>
            <div className={styles.gameId}>
                {`Game ID is ${this.props.gameId}`}
            </div>
            <div className={styles.loader}>
                <div className={styles.spinner}></div>
                <div className={styles.imager}></div>
            </div>
        </div>

    }
}