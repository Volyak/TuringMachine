import React, {Component} from 'react'
import {postSolution} from '../../services/solutionApi'

import './css/table.css';

const startLength = 2;

class PostTable extends Component {
    constructor(props) {
        super(props);
        this.taskId = props.taskId;

        if (props.init) {
            const {commands, goTo} = props.init.table;
            this.state = {
                commands,
                goTo,
                max: startLength,
                resultOfSending: '',
                errorLine: '',
                commandTypes: 'VX><?!'
            };
        } else {
            this.state = {
                commands: new Array(startLength).fill(""),
                goTo: new Array(startLength).fill(""),
                max: startLength,
                resultOfSending: '',
                errorLine: '',
                commandTypes: 'VX><?!'
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

    checkTableSyntax = () => {
        const {commands, goTo} = this.state;
        let result = "";
        for (let i = 0; i < commands.length; i++) {
            if (!this.checkCommandSellSyntax(commands[i]))
                result += " [" + (i + 1) + ", Команда]";
        }
        for (let i = 0; i < goTo.length; i++) {
            if (!this.checkGoToSellSyntax(goTo[i], i))
                result += " [" + (i + 1) + ", Переход]";
        }
        return result;
    };

    checkCommandSellSyntax = (value) => {
        const {commandTypes} = this.state;

        if (!value || value.length > 1) return false;

        return commandTypes.indexOf(value) !== -1;
    };

    checkGoToSellSyntax = (value, index) => {
        const {commands, goTo} = this.state;

        if (!value) {
            return commands[index] === "!";
        }

        if (commands[index] === "?") {
            if (isNaN(value)) {
                const i = value.indexOf(",");
                if (i !== -1 && i + 1 < value.length) {
                    const left = value.substring(0, i);
                    const right = value.substring(i + 1);
                    return (left <= goTo.length && right <= goTo.length);
                } else return false;
            } else return false;
        }
        return value <= goTo.length;
    };

    sendSolution = () => {
        const syntaxErrors = this.checkTableSyntax();
        if (syntaxErrors) {
            let result = "Решение не отправлено. Проверьте следующие ячейки: " + syntaxErrors;
            this.setState({errorLine: result});
            return false;
        }
        const {commands, goTo} = this.state;
        postSolution(this.taskId, {table: {commands, goTo}})
            .then(result => {
                this.setState({resultOfSending: result})
            })
    };

    render() {
        const {commands, goTo, resultOfSending, errorLine} = this.state;

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

        const error = errorLine &&
            <label>{this.state.errorLine}</label>;

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
                <button onClick={this.addLine}>Добавить команду</button>
                <button onClick={this.sendSolution}>Отправить</button>
                {result}
                {error}
            </div>
        )
    }
}

export default PostTable