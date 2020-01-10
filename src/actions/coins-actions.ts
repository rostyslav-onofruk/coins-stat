import client from '../services/client';
import {Dispatch} from 'react';

export const COINS_FETCH_SUCCESS = 'COINS_FETCH_SUCCESS';
export const COINS_FETCH_FAILURE = 'COINS_FETCH_FAILURE';
export const COIN_HISTORY_FETCH_SUCCESS = 'COIN_HISTORY_FETCH_SUCCESS';
export const COIN_HISTORY_FETCH_FAILURE = 'COIN_HISTORY_FETCH_FAILURE';
export const REMOVE_COIN_DATA = 'REMOVE_COIN_DATA';

interface Arg {
    type: string;
    payload: object;
}

export const fetchAllCoins = () => (dispatch: Dispatch<Arg>) => {
    client()
        .get('/coins')
        .then(res => {
            dispatch({
                type: COINS_FETCH_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: COINS_FETCH_FAILURE,
                payload: {...err}
            });
        });
};

export const fetchCoin = (id: number) => (dispatch: Dispatch<Arg>) => {
    client()
        .get(`/coin/${id}/history/24h`)
        .then(res => {
            dispatch({
                type: COIN_HISTORY_FETCH_SUCCESS,
                payload: {...res.data, id}
            });
        })
        .catch(err => {
            console.log('FAIL');
            dispatch({
                type: COIN_HISTORY_FETCH_FAILURE,
                payload: {...err}
            });
        });
};

export const removeCoinData = (id: number) => (dispatch: Dispatch<Arg>) => {
    dispatch({
        type: REMOVE_COIN_DATA,
        payload: {id}
    });
};
