import React, { Component } from 'react'
import IntervalItem from './IntervalItem'
import AddIntervalItem from './AddIntervalItem'
import IntervalControls from './IntervalControls'
import uuid from 'uuid'
import { arrayMove } from '../utility'

export default class Interval extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: 1,
      userid: 1,
      runtime: 0,
      items: [
        {
          id: uuid(),
          active: false,
          type: "Exercise",
          name: "Burpees",
          duration: 60,
          timeleft: 60
        },
        {
          id: uuid(),
          active: false,
          type: "Break",
          duration: 20,
          timeleft: 20
        }
      ]
    }
  }

  componentDidMount() {
    console.log(this.state)
  }

  componentDidUpdate() {
    console.log(this.state)
  }

  handleAddItem = (item) => {
    const items = this.state.items.slice();
    const newItem = Object.assign({}, item)
    newItem.id = uuid()
    items.push(newItem)
    this.setState({
      items: items
    })
  }

  handleDeleteItem = (e, item) => {
    console.log(this.state)
    const items = this.state.items.slice();
    const filtered = items.filter(e => e !== item)
    this.setState({
      items: filtered
    })
    e.preventDefault()
  }

  handleUpItem = (e, item) => {
    const oldIndex = this.state.items.findIndex(x => x.id === item.id)
    const newIndex = oldIndex > 0 ? oldIndex - 1 : oldIndex
    const newItems = arrayMove(this.state.items, oldIndex, newIndex)
    this.setState({ items: newItems })
  }

  handleDownItem = (e, item) => {
    const items = this.state.items
    const oldIndex = items.findIndex(x => x.id === item.id)
    const newIndex = oldIndex < items.length - 1 ? oldIndex + 1 : oldIndex
    const newItems = arrayMove(items, oldIndex, newIndex)
    this.setState({ items: newItems })
  }

  handleStart() {
    console.log("Start")
    this.setState({
      timerId: setInterval(this.tick.bind(this), 1000)
    })
  }

  tick() {
    console.log("Runtime: " + this.state.runtime)

    const runtime = this.state.runtime
    // const items = this.state.items
    // let durationSum = 0
    // let activeItem = runtime === 0 ? items[0] : this.getActiveItem(items, runtime)
    // this.setState({
    //  items.
    // })
    this.setState({ runtime: runtime + 1 })
  }

  // getActiveItem(items, runtime) {
  //   for (let i = 0; i < items.length; i++) {
  //     const item = items[i]

  //     if (runtime == 0) {

  //     } else if (durationSum && runtime) {
  //       activeItem = item
  //     }
  //     durationSum += item.duration

  //     console.log(item)
  //   }
  // }

  handlePause() {
    console.log("Pause")
    clearInterval(this.state.timerId)
  }

  handleReset() {
    console.log("Reset")
    clearInterval(this.state.timerId)
    this.setState({ runtime: 0 })
  }

  render() {

    const listItems = this.state.items.map(item =>
      <IntervalItem
        key={item.id}
        item={item}
        deleteItem={(event) => { this.handleDeleteItem(event, item) }}
        upItem={(event) => { this.handleUpItem(event, item) }}
        downItem={(event) => { this.handleDownItem(event, item) }}
      />
    )

    return (
      <div>
        <div className="box">
          <nav className="panel">
            <div className="panel-heading">Interval</div>
            {listItems}
            <IntervalControls
              onStart={() => this.handleStart()}
              onPause={() => this.handlePause()}
              onReset={() => this.handleReset()}
              runtime={this.state.runtime}
            />
          </nav>
        </div>
        <AddIntervalItem addItem={(item) => { this.handleAddItem(item) }} />
      </div >
    );
  }
}