import React from 'react';
import {Provider} from 'react-redux';
import {render} from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import Header from './Header';

localStorage.setItem('userImg', 'https://lh3.googleusercontent.com/a-/AAuE7mB_8YiDExFFNZH-gzPOcejOb8RXKSdyKbCdvkj3=s96-c');
localStorage.setItem('userName', 'test user');

const mockStore = configureMockStore();
const store = mockStore({coinsData: {data: {coinsDetails: [{}]}}});

describe('<Header />', () => {
    test('check correct avatar', async () => {
        const {findByText} = render(
            <Provider store={store}>
                <Header/>
            </Provider>
        );

        const userInfo = (await findByText('test user')).parentElement;
        const avatar = userInfo?.querySelector('img');
        expect(avatar).toHaveAttribute(
            'src',
            'https://lh3.googleusercontent.com/a-/AAuE7mB_8YiDExFFNZH-gzPOcejOb8RXKSdyKbCdvkj3=s96-c'
        );
    });

    test('check displaying snackbar', async () => {
        const {findByText} = render(
            <Provider store={store}>
                <Header/>
            </Provider>
        );

        const snackbar = (await findByText('Data successfully updated!')).parentElement;
        expect(snackbar).toBeTruthy();
    });
});