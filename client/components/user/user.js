import React, {Component} from 'react'
import {getUser, getUserSolutions} from '../../services/userApi'
import getList from "../common/list";
import SolutionListItem from "../solution/item";

class User extends Component {
    constructor(props){
        super(props);
        this.state={
            username: '',
            role: '',
            solutions:[]
        }
    }

    componentDidMount(){
        getUser(this.props.match.params.userId)
            .then(user =>{
                this.setState({
                    username: user.username,
                    role: user.role})
            });
        getUserSolutions(this.props.match.params.userId)
            .then(solutions => {
                this.setState({
                    solutions
                })
            })
    }

    render() {
        const {username, role, solutions} = this.state;
        const List = getList(SolutionListItem, solutions);
        const name = "Имя: "+ username;
        const userRole = "Роль: "+ role;
        const solutionsLable = solutions.length > 0 ? "Решения пользователя:": "";
        return (
            <div>
                <h3> {name} </h3>
                <h3> {userRole} </h3>
                <h3>{solutionsLable}</h3>
                <List/>
            </div>
        )
    }
}

export default User;