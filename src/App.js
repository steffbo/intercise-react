import React, { Component } from 'react';
import Interval from './components/Interval';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    this.setState({
      interval: {
        id: 0,
        items: [
          {
            id: 0,
            isPause: false,
            name: "Burpees",
            duration: "60"
          },
          {
            id: 1,
            isPause: true,
            name: "Pause",
            duration: "20"
          }
        ]
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Interval interval={this.state.interval} />
      </div>
    );
  }
}

export default App;
