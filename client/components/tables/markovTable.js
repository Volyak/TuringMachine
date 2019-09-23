import React, {Component} from 'react'
import {postSolution} from '../../services/solutionApi'

import './css/table.css';

const startLength = 2;

class MarkovTable extends Component {
    constructor(props) {
        super(props);
        this.taskId = props.taskId;

        this.state = {
            patterns: new Array(startLength).fill(""),
            replacements: new Array(startLength).fill(""),
            max: startLength,
            resultOfSending: ''
        };
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

    sendSolution = () => {
        const {patterns, replacements} = this.state;
        postSolution(this.taskId, {table: {patterns, replacements}})
            .then(result => {
                this.setState({resultOfSending: result})
            })
    };

    render() {
        const {patterns, replacements, resultOfSending} = this.state;

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
            <label>{this.state.resultOfSending.isDone.toString()}</label>;

        return (
            <div className={'table-container'}>
                <table>
                    <thead>
                    <tr>
                        <th key={'1'}>№</th>
                        <th key={'2'}>Образец</th>
                        <th> </th>
                        <th key={'3'}>Замена</th>
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

export default MarkovTable