import React, {Component} from 'react'
import {getSolutionById} from '../../services/solutionApi'
import transposeTable from '../../utilities/transposeTable'

class Solution extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            table: '',
            isDone: ''
        }
    }

    componentDidMount() {
        getSolutionById(this.props.match.params.solutionId)
            .then(data => {
                console.log(data);
                this.setState({
                    username: data.solution.username,
                    table: transposeTable(data.solution.table),
                    isDone: data.solution.isDone
                })
            })
    }

    render() {
        const {username, table, isDone} = this.state;
        console.log(table);
        return (
            <div>
                <p>{username} {isDone.toString()}</p>
                {
                    table &&
                    <table>
                        <thead></thead>
                        <tbody>
                        {
                            table.map((row, index) =>
                                <tr key={index}>{
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
        )
    }
}

Solution.propTypes = {
    // username: PropTypes.string.isRequired,
    //taskName: PropTypes.string.isRequired
}

export default Solution