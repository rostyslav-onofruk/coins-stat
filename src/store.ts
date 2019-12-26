import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

export default function configureStore(initialState?: object) {

    // const finalCreateStore = compose(applyMiddleware(logger, thunk))(createStore);
    const finalCreateStore = compose(applyMiddleware(thunk))(createStore);
    const store = finalCreateStore(rootReducer, initialState);

    // @ts-ignore
    if (module.hot) {
        // Enable webpack hot module replacement for reducers
        // @ts-ignore
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
