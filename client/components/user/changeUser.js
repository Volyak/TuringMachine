import React, {Component} from 'react'
import {getUser, editUser} from '../../services/userApi'
import {getAllRoles} from '../../services/roleApi'

class ChangeUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            selectedRole: '',
            roles: []
        };

        this.id = props.match.params.userId;
    }

    componentDidMount() {
        getAllRoles()
            .then(({roles}) => {
                this.setState({
                    roles: roles.map(({name}) => name)
                });
            });
        getUser(this.id)
            .then(user => {
                this.setState({
                    username: user.username,
                    selectedRole: user.role
                })
            });
    }

    handleChangedRole = (event) => {
        const role = event.target.value;
        this.setState({selectedRole: role});
    };

    send = () => {
        editUser(this.id, {role: this.state.selectedRole});
    };

    render() {
        const {username, selectedRole, roles} = this.state;

        return (
            <div>
                <h3> {username} </h3>
                    <select onChange={this.handleChangedRole} value={selectedRole}>
                        {roles.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                <button onClick={this.send}>Применить</button>
            </div>
        )
    }
}

export default ChangeUser;