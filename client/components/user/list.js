import React, {Component} from 'react'
import UserListItem from './item'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from '../../redux/actions/userActions'
import getList from '../common/list'

class UserList extends Component {

    componentDidMount() {
        this.props.getUsers();
    }

    render() {
        const {users} = this.props;
        const List = getList(UserListItem, users);
        return (<List/>)
    }
}

UserList.propTypes = {
    users: PropTypes.array.isRequired,
    getUsers: PropTypes.func.isRequired
};

export default connect(state => ({
    users: state.user.users
}), actions)(UserList)