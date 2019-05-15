import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const SolutionListItem = (props) => {
    const {id, taskId, taskName, username, isDone} = props;

    return (
        <div className={'item'}>
            <Link to={'/tasks/' + taskId + '/solutions/' + id}>{taskName + ': ' + username}</Link>
            {
                isDone &&
                <div>DONE</div>
            }
        </div>
    )
}

SolutionListItem.propTypes = {
    id: PropTypes.string.isRequired,
    taskId: PropTypes.string.isRequired,
    taskName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired
};

export default SolutionListItem;