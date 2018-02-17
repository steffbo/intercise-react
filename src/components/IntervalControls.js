import React, { Component } from 'react';

class IntervalControls extends Component {

    render() {
        return (
            <div className="box">
                <button className="button is-primary" onClick={this.props.onStart}>Start</button>
                &nbsp;
                <button className="button is-info" onClick={this.props.onPause}>Pause</button>
                &nbsp;
                <button className="button is-danger" onClick={this.props.onReset}>Reset</button>
                &nbsp;
                {this.props.runtime}
            </div>
        );
    }
}

export default IntervalControls;