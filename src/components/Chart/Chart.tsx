import React, {FunctionComponent} from 'react';
import {Line} from 'react-chartjs-2';
import {History} from "../../interfaces/coins";

export interface Props {
    name: string;
    color: string;
    history: History[]
}

const Chart: FunctionComponent<Props> = (props: Props) => {
    const {name, color, history } = props;

    const data = {
        labels: [...history.map((history: History) => formattingDate(new Date(history.timestamp)))],
        datasets: [
            {
                label: `${name} statistics`,
                fill: false,
                lineTension: 0.1,
                backgroundColo: color || '#000',
                borderColor: color || '#000',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: color || '#000',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: color || '#000',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [...history.map((history: History) => Number(history.price).toFixed(2))],
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

    function formattingDate(date: Date) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const day = date.getDate();
        const monthIndex = date.getMonth();

        return `${day}/${monthIndex + 1} ${hours}:${minutes + 1}`;
    }

    return <Line data={data} options={options}/>;
};

export default Chart;