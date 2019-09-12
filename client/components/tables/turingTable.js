import React, {Component} from 'react'
import parseTable from '../../utilities/parseTuringTable'
import {postSolution} from '../../services/solutionApi'

import './css/table.css';

class TuringTable extends Component {
    constructor(props) {
        super(props);
        this.taskId = props.taskId;

        let startRows = [];
        for (let i = 0; i < props.alphabet.length; i++) {
            startRows.push(props.alphabet[i]);
        }
        let rows = [...startRows];

        this.state = {
            cols: ["Q1", "Q2"],
            startRows,
            rows,
            Q1: this.setStartValue(rows),
            Q2: this.setStartValue(rows),
            resultOfSending: '',
            userAlphabet: ''
        };
    }

    setStartValue = (rows) => {
        let Q = {};
        for (let i = 0; i < rows.length; i++) {
            Q[rows[i]] = "";
        }
        return Q;
    };

    handleChange = (e) => {
        let symbol = e.target.id.substring(0, 1);
        let Q = e.target.id.substring(2);

        let newQ = {...this.state[Q]};
        newQ[symbol] = e.target.value;

        this.setState({[Q]: newQ});
    };

    addColumn = () => {
        let newCols = [...this.state.cols, "Q" + (this.state.cols.length + 1)];
        this.setState({
            ["Q" + (this.state.cols.length + 1)]: this.setStartValue(this.state.rows),
            cols: newCols
        });
    };

    handleChangedUserAlphabet = (event) => {
        const {userAlphabet, startRows, cols} = this.state;
        const newUserAlphabet = event.target.value;
        let newRows = [...startRows];
        for (let i = 0; i < newUserAlphabet.length; i++) {
            newRows.push(newUserAlphabet[i]);
        }
        if (newUserAlphabet.length > userAlphabet.length) {
            for (let i = 0; i < newUserAlphabet.length; i++) {
                if (userAlphabet[i] !== newUserAlphabet[i]) {
                    for (let j = 0; j < cols.length; j++) {
                        let newQ = this.state["Q" + (j + 1)];
                        newQ[newUserAlphabet[i]] = "";
                        this.setState({["Q" + (j + 1)]: newQ})
                    }
                    break;
                }
            }
        } else {
            for (let i = 0; i < userAlphabet.length; i++) {
                if (userAlphabet[i] !== newUserAlphabet[i]) {
                    for (let j = 0; j < cols.length; j++) {
                        let newQ = this.state["Q" + (j + 1)];
                        newQ[userAlphabet[i]] = undefined;
                        this.setState({["Q" + (j + 1)]: newQ})
                    }
                    break;
                }
            }
        }
        this.setState({userAlphabet: newUserAlphabet, rows: newRows});
    };

    removeColumn = (e) => {
        let index = e.target.id.indexOf("_");
        let qIndex = parseInt(e.target.id.substring(index + 2));

        for (let i = qIndex; i < this.state.cols.length; i++) {
            this.setState({
                ["Q" + i]: this.state["Q" + (i + 1)]
            });
        }

        let newCols = [...this.state.cols];
        newCols.pop();

        this.setState({
            ["Q" + this.state.cols.length]: undefined,
            cols: newCols
        });
    };

    sendSolution = () => {
        const {userAlphabet} = this.state;
        const table = parseTable(this.state);
        postSolution(this.taskId, {table, userAlphabet})
            .then(result => {
            this.setState({resultOfSending: result})
        })
    };

    render() {
        const {cols, rows, resultOfSending, userAlphabet} = this.state;

        const head = cols.map((col) =>
            <th key={col}>{col}
                <button className={'table-container__delete-btn'} id={"delete_" + col} onClick={this.removeColumn}>X
                </button>
            </th>
        );

        const body = rows.map((symbol) =>
            <tr key={symbol}>
                <th key={'Q0'}>{symbol}</th>
                {
                    cols.map((col) =>
                        <td key={col}>
                            <input id={symbol + "_" + col}
                                   value={this.state[col][symbol]}
                                   onChange={this.handleChange}
                                   type="text"/>
                        </td>
                    )
                }
            </tr>
        );

        const result = resultOfSending &&
            <label>{this.state.resultOfSending.isDone.toString()}</label>;

        return (
            <div className={'table-container'}>
                <div> Служебные символы:
                    <input type="text" value={userAlphabet} onChange={this.handleChangedUserAlphabet}/>
                </div>
                <table>
                    <thead>
                    <tr>
                        <td key={'00'}/>
                        {head}
                    </tr>
                    </thead>
                    <tbody>
                    {body}
                    </tbody>
                </table>
                <button onClick={this.addColumn}>Add</button>
                <button onClick={this.sendSolution}>Send</button>
                {result}
            </div>
        )
    }
}

export default TuringTable