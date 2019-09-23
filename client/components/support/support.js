import React, {Component} from 'react'
import text from './machineText'

class Support extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <label>{text.turingMachine}</label>
            </div>
        )
    }
}

export default Support