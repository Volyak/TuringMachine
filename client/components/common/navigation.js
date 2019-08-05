import React, {Component} from 'react'
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {Link} from 'react-router-dom'
import checker from '../../utilities/groupRightChecker'
import constGroups from "../../const/groups";

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: false,
            solutions: false,
            users: false,
            roles: false
        }
    }

    componentDidMount() {
        const {groups} = this.props;
        this.setState({
            tasks: checker(constGroups.Task, groups),
            solutions: checker(constGroups.Solution, groups),
            users: checker(constGroups.User, groups),
            roles: checker(constGroups.Role, groups)
        })
    }

    render() {
        const {tasks, solutions, users, roles} = this.state;
        return (
            <div>
                {   tasks &&
                    <Link to='/tasks'>Задания</Link>
                }
                {   solutions &&
                    <Link to='/solutions'>Решения</Link>
                }
                {   users &&
                    <Link to='/users'>Пользователи</Link>
                }
                {   roles &&
                    <Link to='/roles'>Роли</Link>
                }
            </div>
        )
    }
}

export default connect(state => ({
    authorized: state.application.authorized,
    username: state.application.username,
    role: state.application.role,
    groups: state.application.groups
}), null)(Navigation)