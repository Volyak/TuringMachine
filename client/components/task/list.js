import React, {Component} from 'react'
import TaskListItem from './item'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import * as actions from "../../redux/actions/taskActions";
import getList from '../common/list'
import ChangeFormController from './changeFormController'

import '../common/css/list.css'

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
        const {tasks} = this.props;
        const List = getList(TaskListItem, tasks);
        const {addingFormIsOpen} = this.state;

        return (
            <div>
                <button onClick={this.openAddingForm}>Add Task</button>
                <List/>
                <ChangeFormController isOpen={addingFormIsOpen} close={this.closeAddingForm}/>
            </div>
        )
    }
}

TaskList.propTypes = {
    tasks: PropTypes.array.isRequired,
    getTasks: PropTypes.func.isRequired
};

export default connect(state => ({
    tasks: state.task.tasks
}), actions)(TaskList)