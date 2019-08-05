import React from 'react'
import {Switch, Route} from 'react-router-dom'
import TaskList from '../task/list'
import Task from '../task/task'
import SolutionList from '../solution/list'
import Solution from '../solution/solution'
import UserList from '../user/list'
import User from '../user/user'
import ChangeUser from '../user/changeUser'
import RoleList from '../role/list'
import Role from '../role/role'
import ChangeRole from '../role/changeRole'
import PrivateRoute from '../common/PrivateRoute'

import './css/appview.css';

const AppView = (props) => {
    return (
        <div className={'appview'}>
            <Switch>
                <PrivateRoute exact path="/tasks" component={TaskList}/>
                <PrivateRoute exact path='/tasks/:taskId' component={Task}/>
                <PrivateRoute exact path='/solutions' component={SolutionList}/>
                <PrivateRoute exact path='/tasks/:taskId/solutions/:solutionId' component={Solution}/>
                <PrivateRoute exact path='/users' component={UserList}/>
                <PrivateRoute exact path='/users/edit/:userId' component={ChangeUser}/>
                <PrivateRoute exact path='/users/:userId' component={User}/>
                <PrivateRoute exact path='/roles' component={RoleList}/>
                <PrivateRoute exact path='/roles/add' component={ChangeRole} />
                <PrivateRoute exact path='/roles/:roleId' component={Role}/>
                <PrivateRoute exact path='/roles/edit/:roleId' component={ChangeRole}/>
            </Switch>
        </div>
    )
};

export default AppView
