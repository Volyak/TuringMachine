import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import * as actions from '../../redux/actions/authorizationActions'
import Popup from '../common/popup'
import SignInForm from './signInForm'
import SignUpForm from './signUpForm'
import TabBar from '../common/tabBar'

import './css/signDialog.css'

const signIn = {
    id: "signIn",
    text: "Вход"
};

const signUp = {
    id: "signUp",
    text: "Регистрация"
};

class SignDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedId: -1};
        this.tabs = [signIn, signUp];
    }

    handleChanged = (tab) => {
        const {openForm} = this.props;
        this.setState({selectedId: tab});
        openForm();
    };

    openSignInForm = () => {this.handleChanged(signIn.id)};

    openSignUpForm = () => {this.handleChanged(signUp.id)};

    render() {
        const {isOpen} = this.props;

        return (
            <React.Fragment>
                <div  className={'appbar__button-panel'}>
                    <button onClick={this.openSignInForm} className={'appbar__button'}>
                        {signIn.text}
                     </button>
                    <button onClick={this.openSignUpForm} className={'appbar__button'}>
                        {signUp.text}
                     </button>
                </div>
                {
                    isOpen &&
                    <Popup>
                        <div className={'sign__form'}>
                            <TabBar handleChanged={this.handleChanged} tabs={this.tabs} selectedId={this.state.selectedId}/>
                            {
                                (this.state.selectedId === signIn.id) &&
                                <SignInForm/>
                            }
                            {
                                (this.state.selectedId === signUp.id) &&
                                <SignUpForm/>
                            }
                        </div>
                    </Popup>
                }
            </React.Fragment>
        )
    }
}
SignDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    openForm: PropTypes.func.isRequired,
};

export default connect(state => ({
    isOpen: state.authorization.isOpen
}), actions)(SignDialog)