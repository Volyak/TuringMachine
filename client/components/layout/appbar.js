import React from 'react'
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import Navigation from '../common/navigation'
import Controls from '../authorization/controls'

import './css/appbar.css'

const AppBar = (props) => {
    return (
        <div className={'appbar'}>
            {
                props.authorized &&
                <Navigation/>
            }
            <Controls/>
        </div>
    )
}

AppBar.propTypes = {
    authorized: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired
};

export default connect(state => ({
    authorized: state.application.authorized,
    username: state.application.username,
    role: state.application.role
}), null)(AppBar)