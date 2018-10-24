import React, { Component } from 'react';

class IntervalControls extends Component {

    render() {

        let btn = !this.props.running ? 
            <button type="button" className="btn btn-primary" onClick={this.props.onStart}>Start</button> :
            <button type="button" className="btn btn-info" onClick={this.props.onPause}>Pause</button>

        return (
            <div className="box">
                {btn}&nbsp;
                <button type="button" className="btn btn-danger" onClick={this.props.onReset}>Reset</button>&nbsp;
                {!this.props.running && 
                    <button type="button" className="btn btn-info" onClick={this.props.addBreaks}>Add Breaks</button>
                }
                &nbsp;
                Total runtime: {this.props.runtime}
            </div>
        );
    }
}

export default IntervalControls;