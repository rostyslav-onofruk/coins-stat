import React, {FunctionComponent} from 'react';
import {Line} from 'react-chartjs-2';
import {Card, CardActions, CardContent, Fab, Typography, IconButton} from "@material-ui/core";
import RefreshIcon from '@material-ui/icons/Refresh';
import DeleteIcon from '@material-ui/icons/Delete';
import {FullCoin, History} from "../../interfaces/coins";

import classes from './CoinCard.scss';

export interface Props {
   coin: FullCoin;
   refreshData: (id: number) => void;
   removeCoin: (id: number) => void;
}

const CoinCard: FunctionComponent<Props> = (props: Props) => {
    const {coin, refreshData, removeCoin} = props;

    const data = {
        labels: [...coin.history.map((history: History) => formattingDate(new Date(history.timestamp)))],
        datasets: [
            {
                label: `${coin.name} statistics`,
                fill: false,
                lineTension: 0.1,
                backgroundColo: coin.color || '#000',
                borderColor: coin.color || '#000',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: coin.color || '#000',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: coin.color || '#000',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [...coin.history.map((history: History) => Number(history.price).toFixed(2))],
            },
        ],
    };

    const options = {
        legend: {
            onClick: (e: Event) => {
                e.stopPropagation();
                e.preventDefault();
            }
        },
    };

    function formattingDate (date: Date) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const day = date.getDate();
        const monthIndex = date.getMonth();

        return `${day}/${monthIndex + 1} ${hours}:${minutes + 1}`;
    }

    return (
        <Card className={classes.card}>
            <div className={classes.cardHeader}>
                <div>
                    <img src={coin.iconUrl} alt={coin.name} className={classes.bigCoinImage}/>
                    <div>
                        <div>{coin.name}</div>
                        <div className={classes.rank}>Rank: {coin.rank}</div>
                    </div>
                </div>
                <div>
                    <Fab color="secondary" aria-label="refresh" size="small" onClick={() => refreshData(coin.id)}>
                        <RefreshIcon />
                    </Fab>
                    <IconButton aria-label="delete" onClick={() => removeCoin(coin.id)}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </div>
            </div>
            <CardContent>
                <Line data={data} options={options} />
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