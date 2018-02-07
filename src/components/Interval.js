import React, { Component } from 'react';
import IntervalItem from './IntervalItem';
import AddIntervalItem from './AddIntervalItem';
import IntervalControls from './IntervalControls';

class Interval extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  handleAddItem = (e, item) => {
    console.log(e);
    console.log(item);
    e.preventDefault();
  }

  render() {
    const listItems = this.props.interval.items.map(item =>
      <IntervalItem key={item.id} item={item} />
    )

    return (
      <div>
        <div className="box">
          <nav className="panel">
            <div className="panel-heading">Interval</div>
            {listItems}
            <IntervalControls />
          </nav>
        </div>
        <AddIntervalItem onAddItem={this.handleAddItem} />
      </div >
    );
  }
}

export default Interval;