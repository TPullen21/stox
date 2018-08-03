import React from 'react';
import { Line } from 'react-chartjs-2';

const dataSet = {
        datasets: [{
            label: 'Price',
            borderColor: '#4885a8',
            backgroundColor: '#b8d1e0',
            fill: 'start',
            data: [],
        }]
}

const options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
        display: false
    },
    scales: {
        xAxes: [{
            type: 'time',
            distribution: 'series',
            display: true,
            ticks: {
                major: {
                    fontStyle: 'bold',
                    fontColor: '#FF0000'
                }
            }
        }],
        yAxes: [{
            display: true
        }]
    },
    elements: {
        line: {
            tension: 0.00001
        }
    }
};

const chart = (props) => {

    dataSet.datasets[0].data = props.chartData.map(datum => {
        return datum.close;
    });

    dataSet.labels = props.chartData.map(datum => {
        return datum.date;
    });

    return (
        <Line data={dataSet} height={400} width={400} options={options}/>
    );
};

export default chart;