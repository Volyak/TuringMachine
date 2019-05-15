import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Popup from '../common/popup'
import EditForm from './changeForm'

import './css/item.css'

const ChangeFormController = (props) => {
    const {isOpen, id, close} = props;

    return (
        <div>
            {
                isOpen &&
                <Popup>
                    <div className={'sign__form'}>
                        <EditForm id={id} close={close}/>
                    </div>
                </Popup>
            }
        </div>
    )
}

ChangeFormController.propTypes={
    isOpen: PropTypes.bool.isRequired,
    id: PropTypes.string,
    close: PropTypes.func.isRequired,
};

export default ChangeFormController;