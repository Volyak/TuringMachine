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
            alphabet: '',
            initTableState: null
        }
    }

    componentDidMount(){
        const {task, init} = this.props;
        this.setState({
            id: task._id,
            name: task.name,
            description: task.description,
            alphabet: task.alphabet,
            initTableState: init})
    }

    render() {
        const {id, name, description, alphabet, initTableState} = this.state;
        return (
            <div className={'task'}>
                <h3> {name} </h3>
                <div> {description} </div>
                <div> Алфавит: {alphabet} </div>
                {
                    alphabet && initTableState  &&
                    <TuringTable taskId={id} alphabet={alphabet} init={initTableState}/>
                }
            </div>
        )
    }
}

export default TuringTask;