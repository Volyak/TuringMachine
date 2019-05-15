import React from 'react'
import {Switch, Route} from 'react-router-dom'
import TaskList from '../task/list'
import Task from '../task/task'
import SolutionList from '../solution/list'
import Solution from '../solution/solution'
//<Route path='/solutions/:solutionId' component={Solution}/>

const AppView = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/tasks' component={TaskList}/>
                <Route exact path='/tasks/:taskId' component={Task}/>
                <Route exact path='/solutions' component={SolutionList}/>
                <Route path='/tasks/:taskId/solutions/:solutionId' component={Solution}/>
            </Switch>
        </div>
    )
};

export default AppView
