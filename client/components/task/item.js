import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import * as actions from '../../redux/actions/taskActions'
import ChangeFormController from "./changeFormController";

import './css/item.css'

class TaskListItem extends Component {
    constructor(props){
        super(props);
        this.state = { editFormIsOpen: false };
    }

    openEditForm = () =>{
      this.setState({ editFormIsOpen: true });
    };

    closeEditForm = () =>{
        this.setState({ editFormIsOpen: false });
    };

    deleteTask = () =>{
        const { id, deleteTask } = this.props;
        deleteTask({ id });
    };

    render() {
        const {id, name} = this.props;
        const {editFormIsOpen} = this.state;

        return (
            <div className={'item'}>
                <Link to={'/tasks/' + id}>{name}</Link>
                <button onClick={this.openEditForm}>edit</button>
                <button onClick={this.deleteTask}>X</button>
                <ChangeFormController isOpen={editFormIsOpen} id={id} close={this.closeEditForm}/>
            </div>
        )
    }
}

TaskListItem.propTypes={
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    deleteTask: PropTypes.func.isRequired
};

export default connect(null, actions)(TaskListItem);