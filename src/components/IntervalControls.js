import React, { Component } from 'react';

class IntervalControls extends Component {

    constructor(props) {
        super(props);

        this.handleStart = this.handleStart.bind(this);
        this.handlePause = this.handlePause.bind(this);
    }

    handleStart() {
        console.log("Start!")
    }

    handlePause() {
        console.log("Pause!")
    }

    render() {
        return (
            <div className="box">
                <button className="button is-primary" onClick={this.handleStart}>Start</button>
                &nbsp;
                <button className="button is-info" onClick={this.handlePause}>Pause</button>
            </div>
        );
    }
}

export default IntervalControls;