import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
    return (
        <div>
            <Link to='/tasks'>Задания</Link>
            <Link to='/solutions'>Решения</Link>
        </div>
    )
}

export default Navigation