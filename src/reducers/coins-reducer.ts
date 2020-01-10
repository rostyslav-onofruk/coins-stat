import {
    COIN_HISTORY_FETCH_FAILURE,
    COIN_HISTORY_FETCH_SUCCESS,
    COINS_FETCH_FAILURE,
    COINS_FETCH_SUCCESS,
    REMOVE_COIN_DATA
} from '../actions/coins-actions';
import {FullCoin, History, ShortCoin} from '../interfaces/coins';
import {Base} from '../interfaces/base';

const INITIAL_STATE: CoinsReducer = {
    data: {
        base: {
            symbol: '',
            sign: '',
        },
        coins: [],
        coinsDetails: []
    },
    loaded: null,
    error: null,
};

interface CoinsReducer {
    data: {
        base: Base;
        coins: ShortCoin[];
        coinsDetails: FullCoin[]
    },
    loaded: boolean | null;
    error: boolean | null;
}

interface Action {
    type: string;
    payload: {
        data: {
            base: Base;
            coins: ShortCoin[];
            history: History[];
        };
        id: number;
    }
}

export default function coinsReducer(state = INITIAL_STATE, action: Action) {
    const {type, payload} = action;
    switch (type) {
        case COINS_FETCH_SUCCESS: {
            return {
                data: {...state.data,
                    coins: [...payload.data.coins.map(({id, name, iconUrl, color, websiteUrl, rank, description}) => {
                        return {id, name, iconUrl, color, websiteUrl, rank, description}
                    })],
                    base: {...payload.data.base}},
                loaded: true, error: false
            };
        }
        case COINS_FETCH_FAILURE:
            console.error('COINS_FETCH_FAILURE', payload);
            return {data: {...state.data}, loaded: false, error: true};
        case COIN_HISTORY_FETCH_SUCCESS: {

            const newCoinsDetails = [...state.data.coinsDetails];
            const index = state.data.coins.map(coin => coin.id).indexOf(payload.id);
            const existedIndex = state.data.coinsDetails.map(coin => coin.id).indexOf(payload.id);
            const newCoinInfo = {...state.data.coins[index], history: [...payload.data.history]};

            if (existedIndex === -1) {
                newCoinsDetails.push(newCoinInfo);
            } else {
                newCoinsDetails[existedIndex] = newCoinInfo;
            }

            return {data: {...state.data, coinsDetails: newCoinsDetails}, loaded: false, error: true};
        }
        case COIN_HISTORY_FETCH_FAILURE:
            console.error('COIN_HISTORY_FETCH_FAILURE', payload);
            return {data: {...state.data}, loaded: false, error: true};
        case REMOVE_COIN_DATA:
            const newCoinsDetails = [...state.data.coinsDetails];
            const index = state.data.coinsDetails.map(coin => coin.id).indexOf(payload.id);
            newCoinsDetails.splice(index, 1);

            return {data: {...state.data, coinsDetails: newCoinsDetails}, loaded: false, error: true};
        default:
            return state;
    }
}
