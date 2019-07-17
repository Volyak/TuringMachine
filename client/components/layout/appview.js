import React from 'react'
import {Switch, Route} from 'react-router-dom'
import TaskList from '../task/list'
import Task from '../task/task'
import SolutionList from '../solution/list'
import Solution from '../solution/solution'
import UserList from '../user/list'
import User from '../user/user'
import RoleList from '../role/list'
import Role from '../role/role'
import PrivateRoute from '../common/PrivateRoute'

import './css/appview.css';

const AppView = () => {
    return (
        <div className={'appview'}>
            <Switch>
                <PrivateRoute exact path="/tasks" component={TaskList} />
                <Route exact path='/tasks/:taskId' component={Task}/>
                <Route exact path='/solutions' component={SolutionList}/>
                <Route exact path='/tasks/:taskId/solutions/:solutionId' component={Solution}/>
                <Route exact path='/users' component={UserList}/>
                <Route exact path='/users/:userId' component={User}/>
                <Route exact path='/roles' component={RoleList}/>
                <Route exact path='/roles/:roleId' component={Role}/>
            </Switch>
        </div>
    )
};

export default AppView
