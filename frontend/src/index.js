import React from 'react'
import ReactDOM from 'react-dom'
import App from 'App'
import registerServiceWorker from 'utils/registerServiceWorker'
import 'assets/styles/core.css'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './store/reducer';
import createSagaMiddleware from 'redux-saga' 
import {forgetIdentity} from "./sagas/watchers"
import {loadNetworks} from "./sagas/actions"
import configureStore from './configureStore';
import createHistory from 'history/createBrowserHistory';
import 'babel-polyfill';
import { ConnectedRouter } from 'react-router-redux';


const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    MOUNT_NODE
    );

/*
ReactDOM.render(
   <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'))
ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()*/
