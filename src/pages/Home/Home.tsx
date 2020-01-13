import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, TextField,} from "@material-ui/core";
import {Autocomplete} from '@material-ui/lab';
import Header from '../../components/Header/Header';
import CoinCard from '../../components/CoinCard/CoinCard';
import {fetchAllCoins, fetchCoin, removeCoinData} from '../../actions/coins-actions';
import {FullCoin, ShortCoin} from '../../interfaces/coins';
import {Base} from "../../interfaces/base";

import classes from './Home.scss';

export interface State {
    coinsData: {
        data: {
            base: Base;
            coins: ShortCoin[];
            coinsDetails: FullCoin[];
        },
        loaded: boolean | null;
    }
}

const Home: FC = () => {
    const {base, coins, coinsDetails} = useSelector((state: State) => state.coinsData.data);
    const {loaded} =  useSelector((state: State) => state.coinsData);
    const [selectedId, setSelectedId] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!coins.length && !loaded) {
            dispatch(fetchAllCoins());
        }
    }, [coins, loaded, dispatch]);

    const handleChange = (e: ChangeEvent<{}>, value: ShortCoin) => {
        if (value) {
            setSelectedId(value.id);
        }
    };

    const getCoinInfo = (id: number) => {
        dispatch(fetchCoin(id || selectedId));
        setSelectedId(0);
    };

    const removeCoin = (id: number) => {
        dispatch(removeCoinData(id));
    };

    return (
        <div>
            <Header/>
            <div className={classes.container}>
                <div className={classes.buttonsWrapper}>
                    <div>
                        <Autocomplete
                            color='secondary'
                            options={coins}
                            getOptionLabel={(coin: ShortCoin) => coin.name}
                            onChange={handleChange}
                            renderOption={(coin: ShortCoin) => (
                                <>
                                    <img src={coin.iconUrl} alt={coin.name} className={classes.coinImage}/>
                                    {coin.name}
                                </>
                            )}
                            style={{width: 300}}
                            renderInput={params => (
                                <TextField {...params} label="Coins" fullWidth/>
                            )}
                        />
                        <Button
                            variant="outlined"
                            color='primary'
                            disabled={!selectedId}
                            onClick={() => getCoinInfo(selectedId)}>
                            Load info
                        </Button>
                    </div>
                    {base.symbol && (<div className={classes.baseInfo}>
                        based on:<span>{base.symbol}</span>
                    </div>)}
                </div>
                {coinsDetails && (<div className={classes.coinCardsWrapper}>
                    {[...coinsDetails].reverse().map((coin: FullCoin) =>
                        <CoinCard key={coin.id} coin={coin} refreshData={getCoinInfo} removeCoin={removeCoin}/>)}
                </div>)}
            </div>
        </div>
    );
};

export default Home;