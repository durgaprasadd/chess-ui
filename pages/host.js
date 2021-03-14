import {Component} from "react";
import Cookies from 'cookies'


class Host extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return <div>
            Host game
            {console.log(this.props)}
        </div>
    }
}
export async function getServerSideProps({req, res}) {
    const cookies = new Cookies(req, res)
    let cookie = cookies.get("login")
    if (cookie == undefined){
        return {
            redirect: {
                permanent: true,
                destination: "/login"
            }
        }
    }
    return { props: { data: "something" } }
}

export default function (props){
    return new Host(props)
}