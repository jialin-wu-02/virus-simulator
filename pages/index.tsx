import React, { Component } from 'react';
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.css';

import Header from '../components/header';
import Simulation from '../components/simulation';
import Chart from '../components/chart';
import ControlPanel from '../components/ControlPanel';


class Home extends Component<{}, { restart, data, parameters }> {
  constructor(props) {
    super(props);
    this.state = {
      restart: false,
      data: [[0], [0], [0]],
      parameters: {
        population: 150,
        washHand: 0,
        socialDistance: 0,
        model: "individual"
      }
    }
  }

  updateData = (newData : any) => {
    this.setState({
      data: [[...this.state.data[0], newData[0]], [...this.state.data[1], newData[1]], [...this.state.data[2], newData[2]]]
    });
  }

  restartHandle = (parameters) => {
    console.log(parameters);
    this.setState({restart: true, parameters})
  }

  restartDoneHandler = () => {
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
            <Simulation parameters={this.state.parameters} restartDoneHandler={this.restartDoneHandler} restart={this.state.restart} updateChartDataHandle={(data) => this.updateData(data)} />
            <Chart population={this.state.parameters.population} restartDoneHandler={this.restartDoneHandler} restart={this.state.restart} data={this.state.data} />
          </div>
          <ControlPanel restartHandle={(args) => this.restartHandle(args)} />
        </main>
      </div>
    )
  
  }
}

export default Home
