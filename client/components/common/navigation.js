import React from 'react'
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import { Link } from 'react-router-dom'

const Navigation = () => {
    return (
        <div>
            <Link to='/tasks'>Задания</Link>
            <Link to='/solutions'>Решения</Link>
            <Link to='/users'>Пользователи</Link>
            <Link to='/roles'>Роли</Link>
        </div>
    )
};

export default connect(state => ({
    authorized: state.application.authorized,
    username: state.application.username,
    role: state.application.role
}), null) (Navigation)