import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../../redux/actions/userActions'

class UserListItem extends Component {
    constructor(props) {
        super(props);
    }
    deleteUser= () => {
        const {id, deleteUser} = this.props;
        deleteUser({id});
    };
    render() {
        const {id, username, role} = this.props;

        return (
            <div className={'item'}>
                <Link to={'/users/' + id}>{username + "   " + role}</Link>
                <button onClick={this.deleteUser}>X</button>
            </div>
        )
    }
}

UserListItem.propTypes = {
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    deleteUser: PropTypes.func.isRequired
};

export default  connect(null,actions)(UserListItem);