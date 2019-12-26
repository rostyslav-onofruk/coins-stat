import client from '../services/client';
import {Dispatch} from "react";

export const COINS_FETCH_SUCCESS = 'COINS_FETCH_SUCCESS';
export const COINS_FETCH_FAILURE = 'COINS_FETCH_FAILURE';

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
                payload: err.message
            });
        });
};


