import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import * as actions from '../../redux/actions/authorizationActions'
import SignDialog from './signDialog'

import './css/signDialog.css'

const Controls = (props) => {
    const { authorized,  signOut} = props;
    if (!authorized) {
        return <SignDialog/>
    }

    return (
        <div  className={'appbar__button-panel'}>
            <button onClick={signOut} className={'appbar__button'}>
                Выход
            </button>
        </div>
    );
};

Controls.propTypes = {
    authorized: PropTypes.bool.isRequired,
    signOut: PropTypes.func.isRequired
};

export default connect(state => ({
    authorized: state.application.authorized
}), actions)(Controls)

