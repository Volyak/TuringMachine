import React, { Component } from 'react'
import AppBar from './appbar';
import AppView from './appview'

import './css/app.css'

class App extends Component {
    render() {
        return (
            <div className={'app'}>
                <AppBar/>
                <AppView/>
            </div>
        )
    }
}

export default App