import React, { Component } from 'react';
import IntervalItem from './IntervalItem';
import AddIntervalItem from './AddIntervalItem';

class Interval extends Component {

  render() {
    const items = this.props.interval.items;
    const listItems = items.map(item =>
      <IntervalItem key={item.id} item={item} />
    )

    return (
      <div>
        <AddIntervalItem />
        {listItems}
      </div>
    );
  }
}

export default Interval;