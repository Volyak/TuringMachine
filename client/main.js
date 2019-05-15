import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Router from 'react-router/Router'
import createBrowserHistory from 'history/createBrowserHistory'
import App from './components/layout/app'
import reducer from './redux/reducers/rootReducer'
import rootSaga from './redux/sagas/rootSaga'
import  { createStore, sagaMiddleware } from './utilities/createStore'
import {init} from './redux/actions/rootActions';

const history = createBrowserHistory();
const store = createStore(reducer);

let sagaRun = sagaMiddleware.run(function* () {
    yield rootSaga({ history })
});

store.dispatch(init());

const renderApp = (app) => {
    ReactDOM.render(
        <Provider store={store}>
            <Router history={history}>
                {app}
            </Router>
        </Provider>,
        document.getElementById('root')
    )
};

renderApp(<App/>);

if (module.hot) {
    module.hot.accept('./components/layout/appview', () => {
        const nextApp = require('./components/layout/appview').default;
        renderApp(nextApp)
    });

    module.hot.accept('./redux/reducers/rootReducer', () => {
        const nextReducer = require('./redux/reducers/rootReducer').default;
        store.replaceReducer(nextReducer)
    });

    module.hot.accept('./redux/sagas/rootSaga', () => {
        const newRootSaga = require('./redux/sagas/rootSaga').default;
        sagaRun.cancel();
        sagaRun.done.then(() => {
            sagaRun = sagaMiddleware.run(function* replaceSaga() {
                yield newRootSaga({ history })
            })
        })
    })
}
