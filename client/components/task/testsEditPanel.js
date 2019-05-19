import React, {Component} from 'react'
import PropTypes from 'prop-types'

class TestsEditPanel extends Component {

    handleChanged = (event) => {
        const {id, value} = event.target;
        const spaceIndex = id.indexOf('_');
        const index = id.substring(0, spaceIndex);
        const type = id.substring(spaceIndex + 1);
        this.props.handleChanged(index, type, value);
    };

    deleteTest = (event) => {
        const {id} = event.target;
        const spaceIndex = id.indexOf('_');
        const index = id.substring(0, spaceIndex);
        this.props.delete(index);
    };

    render() {
        const {tests} = this.props;
        return (
            <div>
                {
                    tests.map((test, index) =>
                        <div key={index}>
                            <div>{index}:</div>
                            <input
                                id={index + '_input'}
                                type='text'
                                placeholder='input'
                                value={test.input}
                                onChange={this.handleChanged}/>
                            <input
                                id={index + '_output'}
                                type='text'
                                placeholder='output'
                                value={test.output}
                                onChange={this.handleChanged}/>
                            <button id={index + '_deleteTest'} onClick={this.deleteTest}>X</button>
                        </div>
                    )
                }
            </div>
        )
    }
}

TestsEditPanel.propTypes = {
    tests: PropTypes.array.isRequired,
    delete: PropTypes.func.isRequired,
    handleChanged: PropTypes.func.isRequired
};

export default TestsEditPanel