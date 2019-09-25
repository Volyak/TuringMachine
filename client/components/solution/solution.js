import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {getSolutionById} from '../../services/solutionApi'
import TuringSolution from "./turingSolution";
import PostSolution from "./postSolution";
import MarkovSolution from "./markovSolution";

import './css/solution.css';
import taskTypes from "../../const/taskTypes";

class Solution extends Component {

    constructor(props) {
        super(props);
        this.state = {
            taskType: null,
            solution: null
        }
    }

    componentDidMount() {
        getSolutionById(this.props.match.params.solutionId)
            .then(solution => {
                this.setState({
                    solution: solution,
                    taskType: solution.task.taskType,
                })
            })
    }

    render() {
        const {solution, taskType} = this.state;
        if(!solution)
            return null;
        return (
            <div className={'solution'}>
                {
                    taskType === taskTypes.Turing.value &&
                    <TuringSolution solution={solution}/>
                }
                {
                    taskType === taskTypes.Post.value &&
                    <PostSolution solution={solution}/>
                }
                {
                    taskType === taskTypes.Markov.value &&
                    <MarkovSolution solution={solution}/>
                }
                { solution &&
                <Link
                    to={{
                        pathname: `/tasks/${solution.task._id}`,
                        state:{init: this.state.solution.solution.parcel}}}>
                    Продолжить решение
                </Link>
                }
            </div>
        )
    }
}

export default Solution