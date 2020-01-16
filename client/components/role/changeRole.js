import React, {Component} from 'react'
import {getRole, updateRole, addRole} from '../../services/roleApi'
import getDefaultRole from '../../utilities/getDefaultRole'
import groupTypes from "../../const/groupTypes";
import rightTypes from "../../const/rightTypes";

class ChangeRole extends Component {
    constructor(props) {
        super(props);
        this.isNew = !props.match.params.roleId;
        this.id = props.match.params.roleId;
        this.state = {
            name: "",
            groups: [],
        }
    }

    componentDidMount() {
        if (!this.isNew) {
            getRole(this.id)
                .then(role => {
                    this.setState({
                        name: role.name,
                        groups: role.groups
                    })
                });
        }
        else {
            console.log('getDefaultRole')
            const role = getDefaultRole();
            console.log(role)
            this.setState({
                name: role.name,
                groups: role.groups
            })
        }
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
        if (!this.isNew) {
            updateRole(this.id, {name, groups});
        }
        else {
            addRole({name, groups})
        }
        document.location.href= "/roles";
    };

    render() {
        const {name, groups} = this.state;
        return (
            <div>
                <h2>Название роли:</h2>
                <input type="text" onChange={this.handleChangedName} placeholder="name" value={name}/>
                <h2>Права: </h2>
                {
                    groups.map((group, i) => <div key={i}>
                        <h3>{groupTypes[group.name].text}</h3>
                        {
                            group.rights.map((right, j) => <div key={j}>
                                <div>{rightTypes[right.name].text}
                                </div>

                                <input id={i + '_' + j} onChange={this.handleChangedPriority} type="number" min="0"
                                       max="10" step="1"
                                       value={right.priority}/>
                            </div>)
                        }
                    </div>)
                }
                <button onClick={this.send}>Применить</button>
            </div>
        )
    }
}

export default ChangeRole;