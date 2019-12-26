import {COINS_FETCH_FAILURE, COINS_FETCH_SUCCESS} from '../actions/coins-actions';
import {Coin} from "../interfaces/coins";

const INITIAL_STATE: CoinsReducer = {
    data: {},
    loaded: null,
    error: null,
};

interface CoinsReducer {
    data: {
        coins?: Coin[];
    },
    loaded: boolean | null;
    error: boolean | null;
}

interface Action {
    type: string;
    payload: {
        data: {
            coins: Coin[];
        };
    }
}

export default function coinsReducer(state = INITIAL_STATE, action: Action) {
    const {type, payload} = action;
    switch (type) {
        case COINS_FETCH_SUCCESS: {
            return {data: {...payload.data}, loaded: true, error: false};
        }
        case COINS_FETCH_FAILURE:
            console.error('COINS_FETCH_FAILURE', payload);
            return {data: {}, loaded: false, error: true};
        default:
            return state;
    }
}
