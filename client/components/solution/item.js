import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../../redux/actions/solutionActions'

class SolutionListItem extends Component  {
    constructor(props) {
        super(props);
    }

    deleteSolution= () => {
        const {id, deleteSolution} = this.props;
        deleteSolution({id});
    };

    render() {
        const {id, taskId, taskName, username, isDone} = this.props;

        return (
            <div className={'item'}>
                <Link to={'/tasks/' + taskId + '/solutions/' + id}>{taskName + ': ' + username}</Link>
                {
                    isDone &&
                    <div>DONE</div>
                }
                <button onClick={this.deleteSolution}>X</button>
            </div>
        )
    }
}

SolutionListItem.propTypes = {
    id: PropTypes.string.isRequired,
    taskId: PropTypes.string.isRequired,
    taskName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired,
    deleteSolution: PropTypes.func.isRequired
};

export default connect(null,actions)(SolutionListItem);