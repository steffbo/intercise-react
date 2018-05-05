import React, { Component } from 'react';

class IntervalControls extends Component {

    render() {

        const p = localStorage.getItem('prevStates')
        const enabled = p && p !== null && p !== undefined
        console.log(enabled)

        return (
            <div className="box">
                <button className="button is-primary" onClick={this.props.onStart}>Start</button>
                &nbsp;
                <button className="button is-info" onClick={this.props.onPause}>Pause</button>
                &nbsp;
                <button className="button is-danger" onClick={this.props.onReset}>Reset</button>
                &nbsp;
                <button className="button is-info" onClick={this.props.addBreaks}>Add Breaks</button>
                &nbsp;
                <button disabled={!enabled} className="button is-info" onClick={this.props.undo}>Undo last action</button>
                &nbsp;
                Total runtime: {this.props.runtime}
            </div>
        );
    }
}

export default IntervalControls;