import React, {Component} from 'react'
import MarkovTable from '../tables/markovTable'

import './css/task.css';

class MarkovTask extends Component {
    constructor(props){
        super(props);
        this.state={
            id: '',
            name: '',
            description: '',
            alphabet: '',
            initTableState: props.init
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
        const {id, name, description, alphabet, initTableState} = this.state;
        return (
            <div className={'task'}>
                <h3> {name} </h3>
                <div> {description} </div>
                <div> Алфавит: {alphabet} </div>
                {
                    alphabet &&
                    <MarkovTable taskId={id} alphabet={alphabet} init={initTableState}/>
                }
            </div>
        )
    }
}

export default MarkovTask;