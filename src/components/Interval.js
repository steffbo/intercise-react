import React, { Component } from 'react';
import IntervalItem from './IntervalItem';
import AddIntervalItem from './AddIntervalItem';
import IntervalControls from './IntervalControls';

export default class Interval extends Component {

  componentWillMount() {
    this.setState(
      {
        id: 1,
        userid: 1,
        items: [
          {
            id: 0,
            type: "Exercise",
            name: "Burpees",
            duration: "60"
          },
          {
            id: 1,
            type: "Break",
            duration: "20"
          }
        ]
      }
    );
  }

  handleAddItem = (item) => {
    const items = this.state.items.slice();
    item.id = items.length
    items.push(item)
    this.setState({
      items: items
    })
    console.log(this.state)
  }

  handleDeleteItem = (e, item) => {
    console.log(e)
    console.log(item)
    e.preventDefault()
  }

  render() {

    const listItems = this.state.items.map(item =>
      <IntervalItem key={item.id} item={item} deleteItem={(event) => { this.handleDeleteItem(event, item) }} />
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
        <AddIntervalItem addItem={this.handleAddItem} />
      </div >
    );
  }
}