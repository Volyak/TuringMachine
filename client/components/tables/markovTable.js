import React, {Component} from 'react'
import {postSolution} from '../../services/solutionApi'

import './css/table.css';

const startLength = 2;

class MarkovTable extends Component {
    constructor(props) {
        super(props);
        this.taskId = props.taskId;
        if (props.init) {
            const {patterns, replacements} = props.init.table;
            this.state = {
                patterns,
                replacements,
                max: startLength,
                resultOfSending: '',
                errorLine: ''
            };
        } else {
            this.state = {
                patterns: new Array(startLength).fill(""),
                replacements: new Array(startLength).fill(""),
                max: startLength,
                resultOfSending: '',
                errorLine: ''
            };
        }
    }

    handleChangePattern = (e) => {
        const i = e.target.name;
        let patterns = [...this.state.patterns];
        patterns[i] = e.target.value;
        this.setState({patterns});
    };

    handleChangeReplacement = (e) => {
        const i = e.target.name;
        let replacements = [...this.state.replacements];
        replacements[i] = e.target.value;
        this.setState({replacements});
    };

    addLine = () => {
        let patterns = [...this.state.patterns, ""];
        let replacements = [...this.state.replacements, ""];
        this.setState({patterns, replacements});
    };

    removeLine = (e) => {
        const index = e.target.name;
        let patterns = [...this.state.patterns];
        let replacements = [...this.state.replacements];

        patterns.splice(index, 1);
        replacements.splice(index, 1);

        this.setState({patterns, replacements});
    };

    checkTableSyntax = () => {
        const {patterns, replacements} = this.state;
        let result = "";
        const hasStop = this.checkReplacementsHaveStop(replacements);
        if (!hasStop)
            result += "Отсутствует конечная формула замены. ";
        const repeatResult = this.checkPatternsRepeat(patterns);
        result += repeatResult;
        return result;
    };

    checkReplacementsHaveStop = (replacements) => {
        for (let i = 0; i < replacements.length; i++)
            if (replacements[i].indexOf(".") !== -1)
                return true;
        return false;
    };

    checkPatternsRepeat = (patterns) => {
        for (let i = 0; i < patterns.length - 1; i++)
            for (let j = i + 1; j < patterns.length; j++)
                if (patterns[i] === patterns[j])
                    return "Образцы " + (i + 1) + ", " + (j + 1) + " повторяются.";
        return "";
    };

    sendSolution = () => {
        const syntaxErrors = this.checkTableSyntax();
        if (syntaxErrors) {
            let result = "Решение не отправлено. " + syntaxErrors;
            this.setState({resultOfSending:'',errorLine: result});
            return false;
        }
        const {patterns, replacements} = this.state;
        postSolution(this.taskId, {table: {patterns, replacements}})
            .then(result => {
                const resultOfSending = result.isDone ? "Успешно выполнено": "Не пройдено";
                this.setState({resultOfSending, errorLine: ''})
            })
    };

    render() {
        const {patterns, replacements, resultOfSending, errorLine} = this.state;

        const body = patterns.map((pattern, i) =>
            <tr key={i}>
                <th>{i + 1}
                    <button className={'table-container__delete-btn'} name={i}
                            onClick={this.removeLine}>X
                    </button>
                </th>
                <td><input name={i}
                           value={pattern}
                           onChange={this.handleChangePattern}
                           type="text"/>
                </td>
                <th>
                    &#10144;
                </th>
                <td><input name={i}
                           value={replacements[i]}
                           onChange={this.handleChangeReplacement}
                           type="text"/>
                </td>
            </tr>
        );

        const result = resultOfSending &&
            <label>{this.state.resultOfSending}</label>;

        const error = errorLine &&
            <label>{this.state.errorLine}</label>;

        return (
            <div className={'table-container'}>
                <table>
                    <thead>
                    <tr>
                        <th key={'1'}>№</th>
                        <th key={'2'}>Образец</th>
                        <th></th>
                        <th key={'3'}>Замена</th>
                    </tr>
                    </thead>
                    <tbody>
                    {body}
                    </tbody>
                </table>
                <button onClick={this.addLine}>Добавить формулу</button>
                <button onClick={this.sendSolution}>Отправить</button>
                {result}
                {error}
            </div>
        )
    }
}

export default MarkovTable