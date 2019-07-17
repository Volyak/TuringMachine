import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const RoleListItem = (props) => {
    const {id, name} = props;

    return (
        <div className={'item'}>
            <Link to={'/roles/' + id}>{name}</Link>
        </div>
    )
}

RoleListItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default RoleListItem;