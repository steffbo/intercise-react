import React, { Component } from 'react';

export default class IntervalControls extends Component {
    render() {
        let btnStartPause = !this.props.running ? 
            <button type="button" className="btn btn-primary" onClick={this.props.onStart}>Start</button> :
            <button type="button" className="btn btn-info" onClick={this.props.onPause}>Pause</button>

        let breakButtons = !this.props.running ?
            <div className="ml-auto row">
                <div className="input-sm col-3 m-1">
                    <input className="form-control" type="number" maxLength="2" min="0"
                            defaultValue={this.props.breakLength} 
                            onChange={this.props.setBreakLength} />                            
                </div>
                <button type="button" className="btn btn-info" onClick={this.props.addBreaks}>+ Breaks</button>&nbsp;
                <button type="button" className="btn btn-danger" onClick={this.props.removeBreaks}>- Breaks</button>
            </div>
            : ""

        return (
            <div className="d-flex">
                <div className="p-2">
                    {btnStartPause}&nbsp;
                    <button type="button" className="btn btn-danger" onClick={this.props.onReset}>Reset</button>&nbsp;
                </div>
                {breakButtons}
            </div>
        );
    }
}