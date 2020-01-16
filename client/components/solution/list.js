import React, {Component} from 'react'
import SolutionListItem from './item'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from '../../redux/actions/solutionActions'
import getList from '../common/list'

import './css/list.css'

class SolutionList extends Component {

    componentDidMount() {
        this.props.getSolutions();
    }

    render() {
        const {solutions} = this.props;
        const List = getList(SolutionListItem, solutions);
        return (
            <div className={'solution__list'}>
                <List/>
            </div>
        )
    }
}

SolutionList.propTypes = {
    solutions: PropTypes.array.isRequired,
    getSolutions: PropTypes.func.isRequired
};

export default connect(state => ({
    solutions: state.solution.solutions
}), actions)(SolutionList)