import React, {Component} from 'react'
import {getUser} from '../../services/userApi'

class User extends Component {
    constructor(props){
        super(props);
        this.state={
            username: '',
            role: '',
        }
    }

    componentDidMount(){
        getUser(this.props.match.params.userId)
            .then(user =>{
                this.setState({
                    username: user.username,
                    role: user.role})
            });
    }

    render() {
        const {username, role} = this.state;

        return (
            <div>
                <h3> {username} </h3>
                <h4> {role} </h4>
            </div>
        )
    }
}

export default User;