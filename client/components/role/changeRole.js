import React, {Component} from 'react'
import {getRole, updateRole} from '../../services/roleApi'

class ChangeRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            groups: [],
        }
    }

    componentDidMount() {
        getRole(this.props.match.params.roleId)
            .then(role => {
                this.setState({
                    name: role.name,
                    groups: role.groups
                })
            });
    }

    handleChangedName = (event) => {
        const name = event.target.value;
        this.setState({name});
    };

    handleChangedPriority = (event) => {
        const {id, value} = event.target;

        let index = id.indexOf("_");
        let i = parseInt(id.substring(0, index));
        let j = parseInt(id.substring(index + 1));

        const {groups} = this.state;
        groups[i].rights[j].priority = value;
        this.setState({groups});
    };

    send = () => {
        const {name, groups} = this.state;
        updateRole(this.props.match.params.roleId, {name, groups});
    };

    render() {
        const {name, groups} = this.state;

        return (
            <div>
                <input type="text" onChange={this.handleChangedName} placeholder="name" value={name}/>
                {
                    groups.map((group, i) => <div key={i}>
                        <h3>{group.name}</h3>
                        {
                            group.rights.map((right, j) => <div key={j}>
                                <div>{right.name + ' ' + right.priority}</div>
                                <input id={i + '_' + j} onChange={this.handleChangedPriority} type="number" min="0" max="10" step="1"
                                       value={right.priority}/>
                            </div>)
                        }
                    </div>)
                }
                <button onClick={this.send}>Send</button>
            </div>
        )
    }
}

export default ChangeRole;