import React, {Component} from 'react';
import {getTask} from '../../services/taskApi';
import taskTypes from "../../const/taskTypes";
import TuringTask from "./turingTask";
import PostTask from "./postTask";
import MarkovTask from "./markovTask";

import './css/task.css';

class Task extends Component {
    constructor(props) {
        super(props);
        let init;

        if(this.props.location.state){
            init = this.props.location.state.init;
        }
        this.state = {
            initTableState: init,
            taskType: null,
            task: null
        };
        console.log(init);
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
        const {task, taskType, initTableState} = this.state;
        return (
            <div className={'task'}>
                {
                    taskType === taskTypes.Turing.value &&
                    <TuringTask task={task} init={initTableState}/>
                }
                {
                    taskType === taskTypes.Post.value &&
                    <PostTask task={task} init={initTableState}/>
                }
                {
                    taskType === taskTypes.Markov.value &&
                    <MarkovTask task={task} init={initTableState} />
                }
            </div>
        )
    }
}

export default Task;