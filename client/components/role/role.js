import React, {Component} from 'react'
import {getRole} from '../../services/roleApi'

class Role extends Component {
    constructor(props){
        super(props);
        this.state={
            name: "",
            groups: [],
        }
    }

    componentDidMount(){
        getRole(this.props.match.params.roleId)
            .then(role =>{
                this.setState({
                    name: role.name,
                    groups: role.groups
                })
            });
    }

    render() {
        const {name, groups} = this.state;

        return (
            <div>
                <h2>{name}</h2>
                {
                    groups.map(group => (<div key={group.name}>
                        <h3>{group.name}</h3>
                        {
                            group.rights.map(right => (<div key={right.name}>
                                {right.name + ' ' + right.priority}
                            </div>))
                        }
                    </div>))
                }
            </div>
        )
    }
}

export default Role;