import React, {Component} from 'react'
import transposeTable from '../../utilities/transposeTable'

import './css/solution.css';

class TuringSolution extends Component {

    constructor(props) {
        super(props);

        const {
            solution: {
                parcel: {table, userAlphabet}, isDone},
            task: {name, alphabet, description},
            username
        } = props.solution;
        this.state = {
            taskName: name,
            alphabet,
            description,
            userAlphabet,
            username,
            table: transposeTable(table),
            isDone
        }
    }

    render() {
        const {taskName, alphabet, description, userAlphabet, username, table, isDone} = this.state;
        const allAlphabet = alphabet + userAlphabet;
        const result = isDone ? "успешно выполнено": "не пройдено";

        return (
            <div className={'solution'}>
                <h3>{taskName}</h3>
                <div>{description}</div>
                <div>Алфавит: {alphabet}</div>
                <div>Служебные символы: {userAlphabet}</div>
                <div>Отправил: {username}</div>
                <div>Статус: {result}</div>
                {
                    table &&
                    <table>
                        <thead>
                        <tr>
                            <th key={'00'}/>
                            {
                                table[0].map((row, index) =>
                                    <th key={index}>{'Q' + (index + 1)}</th>
                                )
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            table.map((row, index) =>
                                <tr key={index}>
                                    <th key={allAlphabet[index]}>{allAlphabet[index]}</th>
                                    {
                                        row.map((cell, index) => {
                                                let content = cell.writeSymbol ? cell.writeSymbol : '';
                                                content += cell.move + cell.nextState;
                                                return <td key={index}>{content}</td>
                                            }
                                        )
                                    }
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                }
            </div>
        )
    }
}

export default TuringSolution