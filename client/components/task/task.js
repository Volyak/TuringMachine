import React, {Component} from 'react'
import {getTask} from '../../services/taskApi'
import Table from '../table/table'

class Task extends Component {
    constructor(props){
        super(props);
        this.state={
            id: '',
            name: '',
            description: '',
            alphabet: ''
        }
    }

    componentDidMount(){
        getTask(this.props.match.params.taskId)
            .then(task =>{
                this.setState({
                    id: task._id,
                    name: task.name,
                    description: task.description,
                    alphabet: task.alphabet})
            });
    }

    render() {
        const {id, name, description, alphabet} = this.state;

        return (
            <div>
                <h3> {name} </h3>
                <h3> {description} </h3>
                <h3> {alphabet} </h3>
                {
                    alphabet &&
                    <Table taskId={id} alphabet={alphabet}/>
                }
            </div>
        )
    }
}

export default Task;