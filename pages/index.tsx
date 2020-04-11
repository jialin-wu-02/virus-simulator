import React, { Component } from 'react';
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.css';

import Header from '../components/header';
import Simulation from '../components/simulation';
import Chart from '../components/chart';


class Home extends Component<{}, { data0, data1, data2 }> {
  constructor(props) {
    super(props);
    this.state = {
      data0: [[0], [0]],
      data1: [[0], [0]],
      data2: [[0], [0]]
    }
  }

  updateData = (newData : any, index : number) => {
    console.log("index is " + index);
    switch(index) {
      case 0:
        console.log("case " + 0 + newData);
        this.setState({
          data0: [[...this.state.data0[0], newData[0]], [...this.state.data0[1], newData[1]]]
        });
        break;
      case 1:
        console.log("case " + 1 + newData);
        this.setState({
          data1: [[...this.state.data1[0], newData[0]], [...this.state.data1[1], newData[1]]]
        });
        break;
      case 2:
        this.setState({
          data2: [[...this.state.data2[0], newData[0]], [...this.state.data2[1], newData[1]]]
        });
      break;
    }
    
  }


  render() {
    return (
        <div className="container">
        <Head>
          <title> Covid19 Simulator </title>
        </Head>
  
        <Header />
  
        <main>
          <h1> COVID 19 Simulator</h1>
          <Simulation updateChartDataHandle={(data) => this.updateData(data, 0)} population={200} />
          <Chart data={this.state.data0} />
          <Simulation updateChartDataHandle={(data) => this.updateData(data, 1)} population={60} />
          <Chart data={this.state.data1} />
          <Simulation updateChartDataHandle={(data) => this.updateData(data, 2)} population={100} />
          <Chart data={this.state.data2} />
        </main>
      </div>
    )
  
  }
}

export default Home
