import React, {Component} from 'react'

import './css/solution.css';

class MarkovSolution extends Component {

    constructor(props) {
        super(props);

        const {
            task: {name, description},
            username,
            solution: {
                parcel: {table}, isDone
            }
        } = props.solution;
        this.state = {
            taskName: name,
            description,
            username,
            table,
            isDone
        }
    }

    render() {
        const {taskName, description, username, table, isDone} = this.state;

        const body = table.patterns.map((pattern, i) =>
            <tr key={i}>
                <th>
                    {i + 1}
                </th>
                <td>
                    {pattern}
                </td>
                <th>
                    &#10144;
                </th>
                <td>
                    {table.replacements[i]}
                </td>
            </tr>
        );

        return (
            <div className={'solution'}>
                <h3>{taskName}</h3>
                <div>{description}</div>
                <div>Отправил: {username}</div>
                <div>Статус: {isDone.toString()}</div>
                {
                    table &&
                    <table>
                        <thead>
                        <tr>
                            <th key={'1'}>№</th>
                            <th key={'2'}>Образец</th>
                            <th key={'empty'}> </th>
                            <th key={'3'}>Замена</th>
                        </tr>
                        </thead>
                        <tbody>
                        {body}
                        </tbody>
                    </table>
                }
            </div>
        )
    }
}

export default MarkovSolution