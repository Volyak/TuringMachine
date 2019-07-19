import React, {Component} from 'react'
import TaskListItem from './item'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import * as actions from "../../redux/actions/taskActions";
import getList from '../common/list'
import ChangeFormController from './changeFormController'
import groups from '../../const/groups'
import rights from '../../const/rights'
import rightChecker from '../../utilities/rightChecker'

import './css/list.css'

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {addingFormIsOpen: false}
    }

    openAddingForm = () => {
        this.setState({addingFormIsOpen: true});
    };

    closeAddingForm = () => {
        this.setState({addingFormIsOpen: false});
    };

    componentDidMount() {
        this.props.getTasks();
    }

    render() {
        const {tasks, canAddTask} = this.props;
        const List = getList(TaskListItem, tasks);
        const {addingFormIsOpen} = this.state;
        return (
            <div className={'task__list'}>
                {canAddTask &&
                <button onClick={this.openAddingForm}>Add Task</button>
                }
                <List/>
                <ChangeFormController isOpen={addingFormIsOpen} close={this.closeAddingForm}/>
            </div>
        )
    }
}

TaskList.propTypes = {
    tasks: PropTypes.array.isRequired,
    getTasks: PropTypes.func.isRequired,
    canAddTask: PropTypes.bool.isRequired
};

export default connect(state => ({
    tasks: state.task.tasks,
    canAddTask: rightChecker(state.application.groups, groups.Task, rights.Add, 1)
}), actions)(TaskList)
