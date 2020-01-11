import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import * as actions from '../../redux/actions/authorizationActions'

import './css/signDialog.css'

class SignInForm extends Component {
    handleChangedUsername = (event) => {
        const username = event.target.value;
        this.props.enterUsername({username});
    };

    handleChangedPassword = (event) => {
        const password = event.target.value;
        this.props.enterPassword({password});
    };

    signIn = () => {
        const {signIn, username, password} = this.props;
        signIn({username, password});
    };

    render() {
        const {username, password, closeForm} = this.props;

        return (
            <div className={'sign__form'}>
                <input
                    type='text'
                    placeholder="Имя пользователя"
                    onChange={this.handleChangedUsername}
                    value={username}
                    className={'sign__input'}/>
                <input
                    type='text'
                    placeholder="Пароль"
                    onChange={this.handleChangedPassword}
                    value={password}
                    className={'sign__input'}/>

                <div className={'sign__button-panel'}>
                    <button onClick={this.signIn} className={'sign__button'}>Войти</button>
                    <button onClick={closeForm} className={'sign__button'}>Отмена</button>
                </div>
            </div>
        )
    }
}

SignInForm.propTypes = {
    signIn: PropTypes.func.isRequired,
    closeForm: PropTypes.func.isRequired,
    enterUsername: PropTypes.func.isRequired,
    enterPassword: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
};

export default connect(state => ({
    username: state.authorization.username,
    password: state.authorization.password
}), actions)(SignInForm)