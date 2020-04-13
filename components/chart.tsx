import React, { Component } from 'react';
import Chart from 'chart.js';

interface propType {
    data : any;
    restart : boolean;
    restartDoneHandler() : void;
}

class chart extends Component<propType> {

    hourlyChart = null;

    componentDidMount = () => {
        let labels = this.props.data[0];
        let data = this.props.data[1];
        var ctx = this.refs.chart;
        this.hourlyChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: "Infeceted Population",
                    data: data,
                    backgroundColor: 'rgb(254, 115, 103, 0.4)',
                    borderColor: 'rgb(254, 115, 103, 0.8)', 
                    borderWidth: 2
                }, {
                    label: "Cured Population",
                    data: data,
                    backgroundColor: 'rgb(104, 181, 253, 0.4)',
                    borderColor: 'rgb(104, 181, 253, 0.8)', 
                    borderWidth: 2
                }]
            },
            options: {
                title: {
                    display: true,
                    text: "Infection Population Over Time",
                    fontSize: 16,
                    fontFamily: "Arial"
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
        this.hourlyChart.canvas.parentNode.style.height = '500px';
        this.hourlyChart.canvas.parentNode.style.width = '700px';
    }

    restart = () => {
        this.hourlyChart.data = {
            labels: [0],
            datasets: [{
                label: "Infeceted Population",
                data: [0],
                backgroundColor: 'rgb(254, 115, 103, 0.4)',
                borderColor: 'rgb(254, 115, 103, 0.8)', 
                borderWidth: 2
            }]
        }

        this.hourlyChart.update();
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.restart) {
            console.log("restart")
            this.props.restartDoneHandler();
            this.restart();
        } else {
            if (this.props.data[0].length > 0) {
                this.addData(this.props.data[0][this.props.data[0].length - 1], this.props.data[1][this.props.data[1].length - 1]);
            }
        }
    }

    addData = (label, data) => {
        this.hourlyChart.data.labels.push(label);
        this.hourlyChart.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
        });

        this.hourlyChart.update();
    }

    render () {
        return (
            <div className="chartContainer">
                <canvas ref="chart" width="300" height="200"></canvas>
            </div>
        )
    }
}

export default chart;