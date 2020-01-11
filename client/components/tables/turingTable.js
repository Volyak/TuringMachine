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

        if (props.init) {

            const {table, userAlphabet} = props.init;
            let userAlphabetArray = [];
            for (let i = 0; i < userAlphabet.length; i++) {
                userAlphabetArray.push(userAlphabet[i]);
            }
            let rows = [...startRows, ...userAlphabetArray];
            let cols = [];

            let QArray = [];
            for (let i = 0, l = table.length; i < l; i++) {
                cols.push("Q" + (i + 1));
                QArray["Q" + (i + 1)] = this.setStartValue(rows);
                for (let j = 0, k = table[i].length; j < k; j++) {
                    QArray["Q" + (i + 1)][rows[j]] = (table[i][j].writeSymbol ? table[i][j].writeSymbol : "") + table[i][j].move + table[i][j].nextState;
                }
                console.log(QArray);
            }

            this.state = {
                cols,
                startRows,
                rows,
                ...QArray,
                resultOfSending: '',
                errorLine: '',
                userAlphabet
            }
        } else {

            let rows = [...startRows];
            this.state = {
                cols: ["Q1", "Q2"],
                startRows,
                rows,
                Q1: this.setStartValue(rows),
                Q2: this.setStartValue(rows),
                resultOfSending: '',
                errorLine: '',
                userAlphabet: ''
            };
        }
    }

    getMoveIndex = (value) => {
        const L = value.lastIndexOf("L");
        const R = value.lastIndexOf("R");
        const S = value.lastIndexOf("S");
        return Math.max(L, R, S);
    };

    checkTableSyntax = () => {
        const {rows, cols} = this.state;
        let result = "", alphabetResult = "", sellsResult = "";
        console.log(result);
        alphabetResult = this.checkUserAlphabet();
        let currentQ, currentSell;
        for (let i = 0; i < cols.length; i++) {
            currentQ = this.state[cols[i]];
            for (let j = 0; j < rows.length; j++) {
                currentSell = currentQ[rows[j]];
                if (!this.checkSellSyntax(currentSell)) {
                    sellsResult += " {" + cols[i] + "," + rows[j] + "}";
                }
            }
        }

        result +=alphabetResult;
        if(sellsResult)
            result+="Проверьте следующие ячейки: "+ sellsResult;
        return result;
    };

    checkSellSyntax = (value) => {
        const {alphabet} = this.props;
        const {userAlphabet, cols} = this.state;

        if (!value) return false;

        const moveCommandIndex = this.getMoveIndex(value);
        if (moveCommandIndex === -1 || moveCommandIndex > 1) {
            return false;
        }

        const writeSymbol = value.substring(0, moveCommandIndex);

        if (writeSymbol && alphabet.indexOf(writeSymbol) === -1 && userAlphabet.indexOf(writeSymbol) === -1)
            return false;

        const nextState = value.substring(moveCommandIndex + 1);

        return !(isNaN(nextState) || nextState < 0 || nextState > cols.length);
    };

    checkUserAlphabet = () => {
        const {userAlphabet, startRows} = this.state;

        for(let i=0;i<userAlphabet.length;i++)
            for(let j=0;j<startRows.length;j++)
                if(userAlphabet[i]===startRows[j])
                    return "Служебные символы содержат символы исходного алфавита. ";
        return "";
    };

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
        const syntaxErrors = this.checkTableSyntax();
        if (syntaxErrors) {
            let result = "Решение не отправлено. " + syntaxErrors;
            this.setState({errorLine: result});
            return false;
        }
        const {userAlphabet} = this.state;
        const table = parseTable(this.state);
        postSolution(this.taskId, {table, userAlphabet})
            .then(result => {
                this.setState({resultOfSending: result})
            })
    };

    render() {
        const {cols, rows, resultOfSending, userAlphabet, errorLine} = this.state;

        console.log('this.state');
        console.log(this.state);
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

        const error = errorLine &&
            <label>{this.state.errorLine}</label>;

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
                <button onClick={this.addColumn}>Добавить состояние</button>
                <button onClick={this.sendSolution}>Отправить</button>
                {result}
                {error}
            </div>
        )
    }
}

export default TuringTable