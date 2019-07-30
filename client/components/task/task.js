import React, {Component} from 'react'
import {getTask} from '../../services/taskApi'
import TuringTask from "./turingTask";
import taskTypes from "../../const/taskTypes";
import PostTask from "./postTask";

import './css/task.css';

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskType: null,
            task: null
        }
    }

    componentDidMount() {
        getTask(this.props.match.params.taskId)
            .then(task => {
                this.setState({
                    taskType: task.taskType,
                    task: task
                })
            });
    }

    render() {
        const {task, taskType} = this.state;
        return (
            <div className={'task'}>
                {
                    taskType === taskTypes.Turing.value &&
                    <TuringTask task={task}/>
                }
                {
                    taskType === taskTypes.Post.value &&
                    <PostTask task={task}/>
                }
            </div>
        )
    }
}

export default Task;