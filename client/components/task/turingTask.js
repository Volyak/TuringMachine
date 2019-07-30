import React, {Component} from 'react'
import TuringTable from '../tables/turingTable'

import './css/task.css';

class TuringTask extends Component {
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
        const {task} = this.props;
        this.setState({
            id: task._id,
            name: task.name,
            description: task.description,
            alphabet: task.alphabet})
    }

    render() {
        const {id, name, description, alphabet} = this.state;
        return (
            <div className={'task'}>
                <h3> {name} </h3>
                <div> {description} </div>
                <div> Алфавит: {alphabet} </div>
                {
                    alphabet &&
                    <TuringTable taskId={id} alphabet={alphabet}/>
                }
            </div>
        )
    }
}

export default TuringTask;