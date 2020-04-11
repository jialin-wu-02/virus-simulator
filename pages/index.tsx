import React, { Component } from 'react';
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.css';

import Header from '../components/header';
import Simulation from '../components/simulation';
import Chart from '../components/chart';


class Home extends Component<{}, { data,}> {
  constructor(props) {
    super(props);
    this.state = {
      data: [[0], [0]],
    }
  }

  updateData = (newData : any) => {
    this.setState({
      data: [[...this.state.data[0], newData[0]], [...this.state.data[1], newData[1]]]
    });
  }


  render() {
    return (
        <div className="container">
        <Head>
          <title> Covid19 Simulator </title>
        </Head>
  
        <main>
          <Header />
          <div style={{display: "flex", alignItems: "center"}}>
            <Simulation updateChartDataHandle={(data) => this.updateData(data)} population={200} />
            <Chart data={this.state.data} />
          </div>
        </main>
      </div>
    )
  
  }
}

export default Home
