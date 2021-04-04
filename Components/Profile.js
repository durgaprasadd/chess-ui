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
        const {name, self, pieces} = this.props
        return <div className={styles.profile}>
            <img src="profile-icon.svg" className={styles.profileIcon}/>
            <div className={styles.name}>
                {self ? `YOU (${name})` : name}
            </div>
            <div className={styles.profilePieces}>
                {pieces.map((piece,i) => <img src={piece.type+"-" + piece.name + ".svg"} key={i} className={styles.profilePiece}/>)}
            </div>
        </div>
    }
}
