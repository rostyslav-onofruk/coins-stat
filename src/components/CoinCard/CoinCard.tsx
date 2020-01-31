import React, {FunctionComponent, useEffect, useState} from 'react';
import {Card, CardActions, CardContent, Fab, IconButton, Typography} from "@material-ui/core";
import RefreshIcon from '@material-ui/icons/Refresh';
import DeleteIcon from '@material-ui/icons/Delete';
import {FullCoin} from "../../interfaces/coins";

import classes from './CoinCard.scss';
import Chart from "../Chart/Chart";

export interface Props {
    coin: FullCoin;
    refreshData: (id: number) => void;
    removeCoin: (id: number) => void;
}

const CoinCard: FunctionComponent<Props> = (props: Props) => {
    const {coin, refreshData, removeCoin} = props;
    const [intervalId, setIntervalId] = useState<undefined | NodeJS.Timeout>(undefined);

    useEffect(() => {
        if (!intervalId) {
            setIntervalId(setInterval(() => refreshData(coin.id), 1000 * 60 * 5));
        }
    }, [refreshData, intervalId, setIntervalId, coin.id]);

    return (
        <Card className={classes.card}>
            <div className={classes.cardHeader}>
                <div>
                    <img src={coin.iconUrl} alt={coin.name} className={classes.bigCoinImage}/>
                    <div>
                        <div id={`coin-${coin.id}`}>{coin.name}</div>
                        <div className={classes.rank}>Rank: {coin.rank}</div>
                    </div>
                </div>
                <div>
                    <Fab id={`refresh-${coin.id}`} color="secondary" aria-label="refresh" size="small" onClick={() => refreshData(coin.id)}>
                        <RefreshIcon/>
                    </Fab>
                    <IconButton id={`delete-${coin.id}`} aria-label="delete" onClick={() => removeCoin(coin.id)}>
                        <DeleteIcon fontSize="small"/>
                    </IconButton>
                </div>
            </div>
            <CardContent>
                <Chart color={coin.color} name={coin.name} history={coin.history} />
                <Typography variant="body2" color="textSecondary" component="p">
                    {coin.description}
                </Typography>
            </CardContent>
            <CardActions>
                <div>
                    <span>For more information visit </span>
                    <a href={coin.websiteUrl} target='_blank' rel='noopener noreferrer'>website</a>
                </div>
            </CardActions>
        </Card>
    );
};

export default CoinCard;