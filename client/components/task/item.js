import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import * as actions from '../../redux/actions/taskActions'
import ChangeFormController from "./changeFormController";
import groups from '../../const/groups'
import rights from '../../const/rights'
import rightChecker from '../../utilities/rightChecker'
import taskTypes from "../../const/taskTypes";

import './css/item.css'

class TaskListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {editFormIsOpen: false};
    }

    openEditForm = () => {
        this.setState({editFormIsOpen: true});
    };

    closeEditForm = () => {
        this.setState({editFormIsOpen: false});
    };

    deleteTask = () => {
        const {id, deleteTask} = this.props;
        deleteTask({id});
    };

    render() {
        const {id, name, taskType, canUpdateTask, canDeleteTask} = this.props;
        const {editFormIsOpen} = this.state;

        return (
            <div className={'item'}>
                <Link to={'/tasks/' + id}>{name}</Link>
                <div>
                    {taskTypes[taskType].text}
                </div>
                <div className={'item__buttons'}>
                    {canUpdateTask &&
                    <button onClick={this.openEditForm}>изменить</button>
                    }
                    {canDeleteTask &&
                    <button onClick={this.deleteTask}>X</button>
                    }
                </div>
                <ChangeFormController isOpen={editFormIsOpen} id={id} close={this.closeEditForm}/>
            </div>
        )
    }
}

TaskListItem.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    canUpdateTask: PropTypes.bool.isRequired,
    canDeleteTask: PropTypes.bool.isRequired,
    deleteTask: PropTypes.func.isRequired
};

export default connect((state, ownProps) => ({
    canUpdateTask: rightChecker(state.application.groups, groups.Task, rights.Update, ownProps.priority),
    canDeleteTask: rightChecker(state.application.groups, groups.Task, rights.Delete, ownProps.priority)
}), actions)(TaskListItem);