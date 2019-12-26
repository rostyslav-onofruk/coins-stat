import {combineReducers} from 'redux';

import coinsReducer from './coins-reducer';

const rootReducer = combineReducers({
    coinsData: coinsReducer
});

export default rootReducer;