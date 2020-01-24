import React from 'react';
import CoinCard from "./CoinCard";
import {FullCoin} from "../../interfaces/coins";
import {configure, shallow} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

const coin: FullCoin = {
    id: 2,
    name: 'Coin',
    color: 'black',
    description: 'test description',
    history: [],
    iconUrl: '',
    websiteUrl: '',
    rank: 5
};

const refreshData = jest.fn();
const removeCoin = jest.fn();

describe('<CoinCard />', () => {
    test('check refresh func call', async () => {
        const wrapper = shallow(
            <CoinCard refreshData={refreshData} coin={coin} removeCoin={removeCoin}/>
        );

        wrapper.find(`#refresh-${coin.name}`).simulate('click');

        expect(refreshData).toBeCalledTimes(1);
    });

    test('check delete func call', async () => {
        const wrapper = shallow(
            <CoinCard refreshData={refreshData} coin={coin} removeCoin={removeCoin}/>
        );

        wrapper.find(`#delete-${coin.name}`).simulate('click');

        expect(removeCoin).toBeCalledTimes(1);
    });
});