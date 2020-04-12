import React, { Component } from 'react';


interface propType {
    restartHandle(stateType : stateType) : void;
}

interface stateType {
    population : number;
    washHand : number;
    socialDistance : number;
    model : string;
}

class ControlPanel extends Component<propType, stateType> {

    constructor(props : propType) {
        super(props);
        this.state = {
            population: 150,
            washHand: 0,
            socialDistance: 0,
            model: "individual"
        };
    }

    handleChange = (e) => {
        this.setState({population: e.target.value});
    }

    render () {
        return (
            <div className="controlPanelContainer" >
            <div className="input-group">
                <select onChange={this.handleChange} className="custom-select" id="inputGroupSelect01">
                    <option value={150} selected> Choose Population Density </option>
                    <option value={150}> Dense (New Jersey) </option>
                    <option value={60}> Normal (Washington) </option>
                    <option value={20}> Sparse (Alaska) </option>
                </select>
                <select className="custom-select" id="inputGroupSelect02">
                    <option selected> Wash Hand? </option>
                    <option value={1}> Yes (Please do) </option>
                    <option value={0}> No </option>
                </select>
                <select className="custom-select" id="inputGroupSelect03">
                    <option selected> Social Distancing </option>
                    <option value={97}> Strictly Enforced (97%) </option>
                    <option value={50}>  Loosely Enforced (50%) </option>
                    <option value={0}>  No Social Distancing (0%) </option>
                </select>
                <select className="custom-select" id="inputGroupSelect03">
                    <option selected> Individual vs. Family </option>
                    <option value="individual"> Individual Model </option>
                    <option value="family">  Family Model </option>
                </select>
                {/* <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-default"> Population </span>
                </div>
                <input type="text" value={this.state.population} onChange={this.handleChange}
                       className="form-control" aria-label="Sizing example input"
                       aria-describedby="inputGroup-sizing-default" /> */}
                <div className="input-group-append">
                    <button type="button" className="btn btn-outline-secondary" 
                            onClick={() => this.props.restartHandle({
                                    population: this.state.population,
                                    washHand: this.state.washHand,
                                    socialDistance: this.state.socialDistance,
                                    model: this.state.model,
                                })}> Restart </button>
                </div>
            </div>
        </div>
        )
    }
}


export default ControlPanel;