import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore, Store} from 'redux'
import {PersistGate} from 'redux-persist/integration/react';
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {Provider} from 'react-redux';
import './index.css';
import Routes from './routes';
import * as serviceWorker from './serviceWorker';

import rootReducer from './reducers';
import thunk from "redux-thunk";

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store: Store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);
export default {store, persistor};

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Routes/>
        </PersistGate>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
