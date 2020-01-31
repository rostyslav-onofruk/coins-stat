import React from 'react';
import CoinCard from "./CoinCard";
import {FullCoin} from "../../interfaces/coins";
import {configure, shallow} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

let coin: FullCoin = {
    id: 2,
    name: 'Coin',
    color: 'black',
    description: 'test description',
    history: [],
    iconUrl: '',
    websiteUrl: '',
    rank: 5
};

const newCoin: FullCoin = {
    id: 2,
    name: 'New Coin',
    color: 'white',
    description: 'test description',
    history: [],
    iconUrl: '',
    websiteUrl: '',
    rank: 4
};

const refreshData = (id: number) => {
    if (id === newCoin.id) {
        coin = {...newCoin};
    }
};

const removeCoin = jest.fn();

describe('<CoinCard />', () => {
    test('check refresh func call', async () => {
        const wrapper = shallow(
            <CoinCard refreshData={refreshData} coin={coin} removeCoin={removeCoin}/>
        );

        const name = wrapper.find(`#coin-${coin.id}`);
        expect(name.text()).toEqual(coin.name);

        wrapper.find(`#refresh-${coin.id}`).simulate('click');
        wrapper.setProps({coin: coin});

        const updatedName = wrapper.find(`#coin-${coin.id}`);
        expect(updatedName.text()).toEqual(newCoin.name);
    });

    test('check delete func call', async () => {
        const wrapper = shallow(
            <CoinCard refreshData={refreshData} coin={coin} removeCoin={removeCoin}/>
        );

        wrapper.find(`#delete-${coin.id}`).simulate('click');

        expect(removeCoin).toBeCalledTimes(1);
    });
});