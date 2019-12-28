import React, {FC, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    Button,
    // Card,
    // CardActions,
    // CardContent,
    TextField,
    // Typography
} from "@material-ui/core";
import {Autocomplete} from '@material-ui/lab';
import Refresh from '@material-ui/icons/Refresh';
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

    const getAllCoins = useCallback(() => {
        dispatch(fetchAllCoins());
    }, [dispatch]);

    useEffect(() => {
        if (!coins) {
            getAllCoins();
        }
    }, [coins, getAllCoins]);

    return (
        <div>
            <Header/>
            <div className={classes.container}>
                <div className={classes.buttonsWrapper}>
                    <Button variant="outlined" color='secondary' onClick={getAllCoins}>
                        Refresh coin list
                        <Refresh/>
                    </Button>
                    <Autocomplete
                        id="combo-coins"
                        options={coins}
                        renderOption={(coin: Coin) => (
                            <>
                                <img src={coin.iconUrl} alt={coin.name} className={classes.coinImage}/>
                                {' ' + coin.name} rank: {coin.rank}
                            </>
                        )}
                        style={{width: 300}}
                        renderInput={params => (
                            <TextField {...params} label="Coins" fullWidth/>
                        )}
                    />
                </div>
                {/*{coins.map((coin: Coin) => (*/}
                {/*    <Card className={classes.card}>*/}
                {/*        <div className={classes.cardHeader}>*/}
                {/*            <div>*/}
                {/*                <img src={coin.iconUrl} alt={coin.name} className={classes.bigCoinImage}/>*/}
                {/*                <div>{coin.name}</div>*/}
                {/*            </div>*/}
                {/*            <div>Rank: {coin.rank}</div>*/}
                {/*        </div>*/}
                {/*        <CardContent>*/}
                {/*            <Typography variant="body2" color="textSecondary" component="p">*/}
                {/*                {coin.description}*/}
                {/*            </Typography>*/}
                {/*        </CardContent>*/}
                {/*        <CardActions>*/}
                {/*            <div>*/}
                {/*                More info <a href={coin.websiteUrl}>here</a>*/}
                {/*            </div>*/}
                {/*        </CardActions>*/}
                {/*    </Card>*/}
                {/*))}*/}
            </div>
        </div>
    );
};

export default Home;