import React, {Component} from 'react'
import {getRole} from '../../services/roleApi'
import groupTypes from "../../const/groupTypes";
import rightTypes from "../../const/rightTypes";

class Role extends Component {
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

    render() {
        const {name, groups} = this.state;
        const roleName = "Название роли: " + name;
        return (
            <div>
                <h2>{roleName}</h2>
                {
                    groups.map(group => (<div key={group.name}>
                        <h3>{groupTypes[group.name].text}</h3>
                        {
                            group.rights.map(right => (<div key={right.name}>
                                {rightTypes[right.name].text + ' ' + right.priority}
                            </div>))
                        }
                    </div>))
                }
            </div>
        )
    }
}

export default Role;