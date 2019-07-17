import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const UserListItem = (props) => {
    const {id, username, role} = props;

    return (
        <div className={'item'}>
            <Link to={'/users/' + id}>{username+"   "+role}</Link>
        </div>
    )
}

UserListItem.propTypes = {
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired
};

export default UserListItem;