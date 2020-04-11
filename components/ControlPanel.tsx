import React, { Component } from 'react';

class ControlPanel extends Component<{restartHandle(any) : void;}, {populationValue : number}> {

    constructor(props) {
        super(props);
        this.state = {
            populationValue: 200
        };
    }

    render () {
        return (
            <div className="controlPanelContainer" style={{width: "500px"}}>
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-default"> Population </span>
                </div>
                <input type="text" value={this.state.populationValue} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
            </div>
            <button type="button" className="btn btn-outline-primary" onClick={() => this.props.restartHandle(this.state.populationValue)}> Restart </button>
        </div>
        )
    }
}


export default ControlPanel;