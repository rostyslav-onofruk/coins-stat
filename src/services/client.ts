import axios  from 'axios';
import config from '../helpers/config';

export default function client() {

    const defaultOptions = {
        baseURL: `${ config.API_URL }` as string,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };

    return {
        get: (url: string, options: object = {}) => {
            return axios.get(url, { ...defaultOptions, ...options });
        }
    };
};
