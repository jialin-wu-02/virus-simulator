import React, { Component } from 'react';
import Chart from 'chart.js';

class chart extends Component<{data : any}> {

    hourlyChart = null;

    componentDidMount = () => {
        const labels = this.props.data[0];
        const data = this.props.data[1];
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

    shouldComponentUpdate = (nextProps, nextState) => {
        if (nextProps.data[0].length > 0) {
            this.addData(this.props.data[0][this.props.data[0].length - 1], this.props.data[1][this.props.data[1].length - 1]);
        }
        return nextProps.data[0].length > this.props.data[0] ||
                nextProps.data[1].length > this.props.data[1];
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
                <canvas ref="chart" width="350" height="200"></canvas>
            </div>
        )
    }
}

export default chart;