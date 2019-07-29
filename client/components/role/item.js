import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import connect from "react-redux/es/connect/connect";
import rightChecker from "../../utilities/rightChecker";
import groups from "../../const/groups";
import rights from "../../const/rights";
import * as actions from "../../redux/actions/roleActions";

const RoleListItem = (props) => {
    const {id, name, canDeleteRole, canUpdateRole} = props;

    const deleteRole = () => {
        const {id, deleteRole} = props;
        deleteRole({id});
    };

    return (
        <div className={'item'}>
            <Link to={'/roles/' + id}>{name}</Link>
            {canUpdateRole &&
                <Link to={'/roles/edit/' + id}>edit</Link>
            }
            {canDeleteRole &&
                <button onClick={deleteRole}>X</button>
            }
        </div>
    )
};

RoleListItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    canUpdateRole: PropTypes.bool.isRequired,
    canDeleteRole: PropTypes.bool.isRequired,
    deleteRole: PropTypes.func.isRequired
};

export default connect(state => ({
    canDeleteRole: rightChecker(state.application.groups, groups.Role, rights.Delete, 1),
    canUpdateRole: rightChecker(state.application.groups, groups.Role, rights.Update, 1)
}), actions)(RoleListItem);