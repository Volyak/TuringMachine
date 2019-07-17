import React, {Component} from 'react'
import RoleListItem from './item'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from '../../redux/actions/roleActions'
import getList from '../common/list'

class RoleList extends Component {

    componentDidMount() {
        this.props.getRoles();
    }

    render() {
        const {roles} = this.props;
        const List = getList(RoleListItem, roles);
        return (<List/>)
    }
}

RoleList.propTypes = {
    roles: PropTypes.array.isRequired,
    getRoles: PropTypes.func.isRequired
};

export default connect(state => ({
    roles: state.role.roles
}), actions)(RoleList)