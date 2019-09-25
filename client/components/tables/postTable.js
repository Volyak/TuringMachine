import React, {Component} from 'react'
import {postSolution} from '../../services/solutionApi'

import './css/table.css';

const startLength = 2;

class PostTable extends Component {
    constructor(props) {
        super(props);
        this.taskId = props.taskId;

        if(props.init){
            const {commands,goTo} = props.init.table;
            this.state = {
                commands,
                goTo,
                max: startLength,
                resultOfSending: ''
            };
        }   else {
            this.state = {
                commands: new Array(startLength).fill(""),
                goTo: new Array(startLength).fill(""),
                max: startLength,
                resultOfSending: ''
            };
        }
    }

    handleChangeCommand = (e) => {
        const i = e.target.name;
        let commands = [...this.state.commands];
        commands[i] = e.target.value;
        this.setState({commands});
    };

    handleChangeGoTo = (e) => {
        const i = e.target.name;
        let goTo = [...this.state.goTo];
        goTo[i] = e.target.value;
        this.setState({goTo});
    };

    addLine = () => {
        let commands = [...this.state.commands, ""];
        let goTo = [...this.state.goTo, ""];
        this.setState({commands, goTo});
    };

    removeLine = (e) => {
        const index = e.target.name;
        let commands = [...this.state.commands];
        let goTo = [...this.state.goTo];

        commands.splice(index, 1);
        goTo.splice(index, 1);

        this.setState({commands, goTo});
    };

    sendSolution = () => {
        const {commands, goTo} = this.state;
        postSolution(this.taskId, {table: {commands, goTo}})
            .then(result => {
                this.setState({resultOfSending: result})
            })
    };

    render() {
        const {commands, goTo, resultOfSending} = this.state;

        const body = commands.map((command, i) =>
            <tr key={i}>
                <th>{i + 1}
                    <button className={'table-container__delete-btn'} name={i}
                            onClick={this.removeLine}>X
                    </button>
                </th>
                <th><input name={i}
                           value={command}
                           onChange={this.handleChangeCommand}
                           type="text"/>
                </th>
                <th><input name={i}
                           value={goTo[i]}
                           onChange={this.handleChangeGoTo}
                           type="text"/>
                </th>
            </tr>
        );

        const result = resultOfSending &&
            <label>{this.state.resultOfSending.isDone.toString()}</label>;

        return (
            <div className={'table-container'}>
                <table>
                    <thead>
                    <tr>
                        <th key={'1'}>№</th>
                        <th key={'2'}>Команда</th>
                        <th key={'3'}>Переход</th>
                    </tr>
                    </thead>
                    <tbody>
                    {body}
                    </tbody>
                </table>
                <button onClick={this.addLine}>Add</button>
                <button onClick={this.sendSolution}>Send</button>
                {result}
            </div>
        )
    }
}

export default PostTable