import React,{Component} from 'react'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect'
import * as actions from '../../redux/actions/taskActions'

import './css/editTaskForm.css'

class TaskChangeForm extends Component{
    constructor(props){
        super(props);

        if(props.task){
            this.state = {
                name: props.task.name,
                description: props.task.description,
                alphabet: props.task.alphabet
            }
        }
        else {
            this.state = {
                name: '',
                description: '',
                alphabet: ''
            }
        }

    }

    sendData = () => {
        const { id, updateTask, addTask, close } = this.props;
        const newTask = {
            name: this.state.name,
            description: this.state.description,
            alphabet: this.state.alphabet
        };

        if(id){
            updateTask({id, newTask});
        } else {
            addTask({newTask});
        }
        close();
    };

    handleChangedName= (event) => {
        const name = event.target.value;
        this.setState({name});
    };

    handleChangedDescription= (event) => {
        const description = event.target.value;
        this.setState({description});
    };

    handleChangedAlphabet= (event) => {
        const alphabet = event.target.value;
        this.setState({alphabet});
    };

    render() {
        const {name, description, alphabet}=this.state;

        return(
            <div className={'form'}>
                <input
                    type='text'
                    placeholder = 'name'
                    value={name}
                    className={'input'}
                    onChange={this.handleChangedName}
                />
                <input
                    type = 'text'
                    placeholder= 'description'
                    value={description}
                    className={'input'}
                    onChange={this.handleChangedDescription}
                />
                <input
                    type = 'text'
                    placeholder='alphabet'
                    value={alphabet}
                    className={'input'}
                    onChange={this.handleChangedAlphabet}
                />
                <div className={'button-panel'}>
                    <button onClick={this.sendData} className={'button'}>Send</button>
                    <button onClick={this.props.close} className={'button'}>Close</button>
                </div>
            </div>
        )
    }
}

TaskChangeForm.propTypes = {
    task: PropTypes.object,
    id: PropTypes.string,
    close: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
    addTask: PropTypes.func.isRequired
};

export default connect((state, ownProps) => ({
    task: state.task.tasks.find(item =>{
        if(ownProps.id){
            return item._id === ownProps.id
        } else return null;
    })
}), actions)(TaskChangeForm)