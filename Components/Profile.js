import React, {Component} from "react";
import styles from "../styles/Home.module.css"


export class Profile extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        self : false
    }

    render() {
        const {name, color, self} = this.props
        return <div className={styles.profile}>
            <img src="profile-icon.svg" className={styles.profileIcon}/>
            <div className={styles.name}>
                {self ? `YOU (${name})` : name}
            </div>
            <div className={styles.profilePieces}>
                <img src="black-bishop.svg" className={styles}/>
                <img src="black-rook.svg" className={styles}/>
                <img src="black-knight.svg" className={styles}/>
            </div>
        </div>
    }
}
