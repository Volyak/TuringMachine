import React, {Component} from 'react'

import './css/solution.css';

class PostSolution extends Component {

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

        const body = table.commands.map((command, i) =>
            <tr key={i}>
                <th>
                    {i + 1}
                </th>
                <th>
                    {command}
                </th>
                <th>
                    {table.goTo[i]}
                </th>
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
                            <th key={'2'}>Команда</th>
                            <th key={'3'}>Переход</th>
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

export default PostSolution