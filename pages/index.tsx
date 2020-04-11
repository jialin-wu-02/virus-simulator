import React, { Component } from 'react';
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.css';

import Header from '../components/header';
import Simulation from '../components/simulation';
import Chart from '../components/chart';
import ControlPanel from '../components/ControlPanel';


class Home extends Component<{}, { restart, data, population }> {
  constructor(props) {
    super(props);
    this.state = {
      restart: false,
      data: [[0], [0]],
      population: 200
    }
  }

  updateData = (newData : any) => {
    this.setState({
      data: [[...this.state.data[0], newData[0]], [...this.state.data[1], newData[1]]]
    });
  }

  restartSimulation = (population) => {
    console.log("click and restart...");
    this.setState({ restart: true, population })
  }

  restartDoneHandler = () => {
    console.log("Done");
    this.setState({ restart: false })
  }

  render() {
    return (
        <div className="container">
        <Head>
          <title> A Real-Time Generated Responsive Virus Simulation </title>
        </Head>
  
        <main>
          <Header />
          <div style={{display: "flex", alignItems: "center"}}>
            <Simulation restartDoneHandler={this.restartDoneHandler} restart={this.state.restart} updateChartDataHandle={(data) => this.updateData(data)} population={200} />
            <Chart restartDoneHandler={this.restartDoneHandler} restart={this.state.restart} data={this.state.data} />
          </div>
          <ControlPanel restartHandle={(data) => this.restartSimulation(data)} />
        </main>
      </div>
    )
  
  }
}

export default Home
