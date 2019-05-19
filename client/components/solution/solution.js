import React, {Component} from 'react'
import {getSolutionById} from '../../services/solutionApi'
import transposeTable from '../../utilities/transposeTable'

class Solution extends Component {

    constructor(props) {
        super(props);
        this.state = {
            taskName: '',
            alphabet: '',
            description: '',
            username: '',
            table: '',
            isDone: ''
        }
    }

    componentDidMount() {
        getSolutionById(this.props.match.params.solutionId)
            .then(data => {
                this.setState({
                    taskName: data.task.name,
                    alphabet: data.task.alphabet,
                    description: data.task.description,
                    username: data.solution.username,
                    table: transposeTable(data.solution.table),
                    isDone: data.solution.isDone
                })
            })
    }

    render() {
        const {taskName, alphabet, description, username, table, isDone} = this.state;
        return (
            <div>
                <div>
                    <p>{taskName}</p>
                    <p>{description}</p>
                    <p>Алфавит: {alphabet}</p>
                </div>
                <div>
                    <p>Отправил: {username}</p>
                    <p>Статус: {isDone.toString()}</p>
                    {
                        table &&
                        <table>
                            <thead>
                            <tr>
                                <th key={'00'}></th>
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
                                        <th key={alphabet[index]}>{alphabet[index]}</th>
                                        {
                                            row.map(cell => {
                                                    let content = cell.writeSymbol ? cell.writeSymbol : '';
                                                    content += cell.move + cell.nextState;
                                                    return <td key={cell._id}>{content}</td>
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
            </div>
        )
    }
}

Solution.propTypes = {
    // username: PropTypes.string.isRequired,
    //taskName: PropTypes.string.isRequired
}

export default Solution