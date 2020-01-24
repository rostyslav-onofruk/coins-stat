import React from 'react';
import Home from "./Home";
import {Provider} from "react-redux";
import configureMockStore from "redux-mock-store";
import {render} from "@testing-library/react";

const mockStore = configureMockStore();
const store = mockStore({coinsData: {data: {base: {symbol: 'USD', sign: '$'}, coinsDetails: [], coins: [{}]}}});

describe('<Home />', () => {
    test('check displaying base info', async () => {
        const {findByText} = render(
            <Provider store={store}>
                <Home/>
            </Provider>
        );

        const baseInfo = (await findByText(`USD`));
        expect(baseInfo.tagName).toBe('SPAN');
    });
});