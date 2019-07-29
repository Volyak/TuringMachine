import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../../redux/actions/userActions'
import rightChecker from "../../utilities/rightChecker";
import groups from "../../const/groups";
import rights from "../../const/rights";

class UserListItem extends Component {
    constructor(props) {
        super(props);
    }

    deleteUser = () => {
        const {id, deleteUser} = this.props;
        deleteUser({id});
    };

    render() {
        const {id, username, role, canDeleteUser, canUpdateUser} = this.props;

        return (
            <div className={'item'}>
                <Link to={'/users/' + id}>{username + "   " + role}</Link>
                {canUpdateUser &&
                <Link to={'/users/edit/' + id}>edit</Link>
                }
                {canDeleteUser &&
                <button onClick={this.deleteUser}>X</button>
                }
            </div>
        )
    }
}

UserListItem.propTypes = {
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    canDeleteUser: PropTypes.bool.isRequired,
    deleteUser: PropTypes.func.isRequired,
    canUpdateUser: PropTypes.bool.isRequired,
};

export default connect((state) => ({
    canDeleteUser: rightChecker(state.application.groups, groups.User, rights.Delete, 1),
    canUpdateUser: rightChecker(state.application.groups, groups.User, rights.Update, 1),
}), actions)(UserListItem);