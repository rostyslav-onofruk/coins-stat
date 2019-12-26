import React from 'react';
import {Store} from 'redux';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.css';
import Routes from './routes';
import * as serviceWorker from './serviceWorker';
import configureStore from './store';

// @ts-ignore
export const store: Store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Routes/>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
