import React, {Component} from 'react'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect'
import * as actions from '../../redux/actions/taskActions'
import TestsEditPanel from './testsEditPanel';
import taskTypes from '../../const/taskTypes'

import './css/editTaskForm.css'

class TaskChangeForm extends Component {
    constructor(props) {
        super(props);

        if (props.task) {
            let tests = props.task.tests.map(test => {
                return {input: test.input, output: test.output}
            });

            this.state = {
                name: props.task.name,
                description: props.task.description,
                type: props.task.taskType,
                alphabet: props.task.alphabet,
                tests,
                newInput: '',
                newOutput: ''
            }
        } else {
            this.state = {
                name: '',
                description: '',
                type: taskTypes.Turing.value,
                alphabet: '',
                tests: [],
                newInput: '',
                newOutput: ''
            }
        }
    }

    sendData = () => {
        const {id, updateTask, addTask, close} = this.props;

        const newTask = {
            name: this.state.name,
            taskType: this.state.type,
            description: this.state.description,
            alphabet: this.state.alphabet,
            tests: this.state.tests
        };

        if (id) {
            updateTask({id, newTask});
        } else {
            addTask({newTask});
        }
        close();
    };

    addTest = () => {
        const {newInput, newOutput, tests} = this.state;
        let newTests = [...tests, {input: newInput, output: newOutput}];
        this.setState({tests: newTests, newInput: '', newOutput: ''});
    };

    deleteTest = (index) => {
        const {tests} = this.state;
        let newTests = tests.filter(
            (test, i) =>
                i.toString() !== index
        );
        this.setState({tests: newTests});
    };

    handleChangedName = (event) => {
        const name = event.target.value;
        this.setState({name});
    };

    handleChangedDescription = (event) => {
        const description = event.target.value;
        this.setState({description});
    };

    handleChangedType = (event) => {
        const type = event.target.value;
        this.setState({type});
    };

    handleChangedAlphabet = (event) => {
        const alphabet = event.target.value;
        this.setState({alphabet});
    };

    handleChangedTest = (index, type, value) => {
        let newTests = [...this.state.tests];
        newTests[index][type] = value;
        this.setState({tests: newTests});
    };

    handleChangedNewTest = (event) => {
        const {id, value} = event.target;
        this.setState({[id]: value});
    };

    render() {
        const {name, description, type, alphabet, tests, newInput, newOutput} = this.state;

        return (
            <div className={'form'}>
                <label htmlFor={'name'}>Название</label>
                <input
                    type='text'
                    id='name'
                    value={name}
                    className={'input'}
                    onChange={this.handleChangedName}
                />
                <label>Тип</label>
                <select onChange={this.handleChangedType} value={type}>
                    {Object.keys(taskTypes).map(t => <option key={taskTypes[t].value}
                                                             value={taskTypes[t].value}>{taskTypes[t].text}</option>)}
                </select>
                <label htmlFor={'description'}>Описание</label>
                <input
                    type='text'
                    id='description'
                    value={description}
                    className={'input'}
                    onChange={this.handleChangedDescription}
                />
                {(type === taskTypes.Turing.value ||
                    type === taskTypes.Markov.value) &&
                <div>
                    <label htmlFor={'alphabet'}>Алфавит</label>
                    <input
                        type='text'
                        id='alphabet'
                        value={alphabet}
                        className={'input'}
                        onChange={this.handleChangedAlphabet}
                    />
                </div>
                }
                <TestsEditPanel tests={tests} delete={this.deleteTest} handleChanged={this.handleChangedTest}/>
                <div className={'form__add-panel'}>
                    <input
                        id='newInput'
                        type='text'
                        placeholder='input'
                        value={newInput}
                        onChange={this.handleChangedNewTest}/>
                    <input
                        id='newOutput'
                        type='text'
                        placeholder='output'
                        value={newOutput}
                        onChange={this.handleChangedNewTest}/>
                    <button onClick={this.addTest}>+</button>
                </div>
                <div className={'form__button-panel'}>
                    <button onClick={this.sendData}>Send</button>
                    <button onClick={this.props.close}>Close</button>
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
    addTask: PropTypes.func.isRequired,
};

export default connect((state, ownProps) => ({
    task: state.task.tasks.find(item => {
        if (ownProps.id) {
            return item._id === ownProps.id
        } else return null;
    })
}), actions)(TaskChangeForm)