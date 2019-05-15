import React from 'react'
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import Navigation from '../common/navigation'
import Controls from '../authorization/controls'

import styled from 'styled-components'

const AppBar = (props) => {
    return (
        <AppBarWrapper>
            {
                props.authorized &&
                <Navigation/>
            }
            <Controls/>
        </AppBarWrapper>
    )
}

AppBar.propTypes = {
    authorized: PropTypes.bool.isRequired
};

export default connect(state => ({
    authorized: state.application.authorized
}), null)(AppBar)

const AppBarWrapper = styled.div`
    top: 0; 
    left: auto; 
    right: 0; 
    position: fixed; 

    background: cadetblue; 
    color: whitesmoke; 
    width: 100%; 
    display: flex; 
    flex-direction: row;
    `;