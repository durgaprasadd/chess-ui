import {Component} from "react";
import styles from '../styles/Home.module.css'
import cookieCutter from 'cookie-cutter'

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            nameError: false,
            password: "",
            passwordError: false
        }
    }

    something(e){
        const value = e.target.value.trim()
        const regex = new RegExp("^[a-z].*")
        console.log(value)
        const errorName = e.target.name + 'Error'
        this.setState(
            (regex.test(value) || value === "") ? {[e.target.name]: value, [errorName]: false} : {[errorName]: true})
    }
    render(){
        return <div>
            <main>
                <div className={styles.login}>
                <div>
                    Name
                    {console.log("it rendered")}
                </div>
                <input name={"name"} className={styles.text} onChange={this.something.bind(this)} value={this.state.name}/>
                {this.state.nameError && <div>
                    there is some error
                </div>}
                <div>
                    Password
                </div>
                <input name={"password"} className={styles.text} type={"password"} onChange={this.something.bind(this)} value={this.state.password}/>
                {this.state.passwordError && <div>
                    there is some error
                </div>}
                </div>
            </main>
        </div>
    }
}

export default function (props){
    return new Login(props)
}