import React, {Component} from 'react'
import RoleListItem from './item'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from '../../redux/actions/roleActions'
import getList from '../common/list'
import rightChecker from "../../utilities/rightChecker";
import groups from "../../const/groups";
import rights from "../../const/rights";
import {Link} from "react-router-dom";
import './css/list.css'

class RoleList extends Component {

    componentDidMount() {
        this.props.getRoles();
    }
    addRoleHandler = () => {
        document.location.href = "/roles/add"
    };
    render() {
        const {roles, canAddRole} = this.props;
        const List = getList(RoleListItem, roles);
        return (
            <div className={'role__list'}>
                {canAddRole &&
                    <button onClick={this.addRoleHandler}>Добавить роль</button>
                }
                <List/>
            </div>
        )
    }
}

RoleList.propTypes = {
    roles: PropTypes.array.isRequired,
    getRoles: PropTypes.func.isRequired,
    canAddRole: PropTypes.bool.isRequired
};

export default connect(state => ({
    roles: state.role.roles,
    canAddRole: rightChecker(state.application.groups, groups.Role, rights.Add, 1)
}), actions)(RoleList)