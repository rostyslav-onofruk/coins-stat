import React, {FC, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Chip} from "@material-ui/core";
import Header from '../../components/Header/Header';
import {fetchAllCoins} from '../../actions/coins-actions';
import {Coin} from '../../interfaces/coins';

import classes from './Home.scss';

export interface State {
    coinsData: {
        data: {
            coins: Coin[];
        }
    }
}

const Home: FC = () => {
    const dispatch = useDispatch();
    const {coins} = useSelector((state: State) => state.coinsData.data);

    const [showed, setShowed] = useState<boolean>(true);

    const getAllCoins = () => {
        dispatch(fetchAllCoins());
    };

    return (
        <div>
            <Header/>
            <div className={classes.container}>
                <div className={classes.buttonsWrapper}>
                    <Button variant="contained" color='primary' onClick={getAllCoins}>
                        {coins ? 'Refresh AlL Coins' : 'Load All Coins'}
                    </Button>
                    {coins && (
                        <Button variant="outlined" color='secondary' onClick={() => setShowed(!showed)}>
                            {showed ? 'Hide list' : 'Show list'}
                        </Button>
                    )}
                </div>
                <div>
                    {coins && showed && (
                        <div>
                            {coins.map((coin: Coin) => (
                                <Chip
                                    key={coin.id}
                                    icon={<img className={classes.coinImage} src={coin.iconUrl} alt={coin.name} />}
                                    label={coin.name}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;