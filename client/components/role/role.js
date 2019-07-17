import React, {Component} from 'react'
import {getRole} from '../../services/roleApi'

class Role extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            rights: [],
        }
    }

    componentDidMount() {
        getRole(this.props.match.params.roleId)
            .then(role => {
                this.setState({
                    name: role.name,
                    rights: role.rights
                })
            });
    }

    render() {
        const {name, rights} = this.state;

        return (
            <div>
                <h3> {name} </h3>
                {
                    rights.map((right) => {
                        return <h3 key={right.rightName}>{right.rightName + " = " + right.priority}</h3>
                    })}
            </div>
        )
    }
}

export default Role;