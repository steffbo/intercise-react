import React, { Component } from 'react'
import IntervalItem from './IntervalItem'
import AddIntervalItem from './AddIntervalItem'
import IntervalControls from './IntervalControls'
import uuid from 'uuid'
import { arrayMove } from '../utility'
import _ from 'lodash'
import beep from '../beep.mp3'

export default class Interval extends Component {

  constructor(props) {
    super(props)
    this.state = this.getDefault()
    
  }

  getDefault() {
    return {
      id: 1,
      userid: 1,
      runtime: -3,
      items: [
        {
          id: uuid(),
          active: false,
          type: "Exercise",
          name: "Burpees",
          duration: 5,
          timeleft: 5
        },
        {
          id: uuid(),
          active: false,
          type: "Break",
          duration: 10,
          timeleft: 10
        }
      ]
    }
  }

  componentDidMount() {
    // console.log(this.state)
  }

  componentDidUpdate() {
    // console.log("Component did update!")
    // console.log(this.state)
  }

  handleAddItem = (item) => {
    const items = this.state.items.slice();
    // const newItem = Object.assign({}, item)
    const newItem = { ...item }
    newItem.id = uuid()
    console.log(newItem)
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
    const items = this.state.items
    const newItems = this.updateItems(items, runtime)

    if (runtime < 0) {
      new Audio(beep).play()
    }

    // Update runtime
    this.setState({
      runtime: runtime + 1,
      items: newItems
    })
  }

  updateItems(items, runtime) {
    let durationSum = 0
    const newItems = _.cloneDeep(items)
    // const newItems = {...items}
    let finished = true

    for (let i = 0; i < newItems.length; i++) {
      let item = newItems[i]

      if (durationSum <= runtime && runtime < durationSum + item.duration) {
        item.active = true
        item.timeleft = item.duration + durationSum - runtime - 1

        if (item.timeleft < 3) {
          new Audio(beep).play()          
        }

        finished = false
      } else {
        item.active = false
      }

       finished = finished && runtime > 0

      durationSum += item.duration
    }
    if (finished) {
      console.log("Finished")
      this.handlePause()
    }
    return newItems
  }

  handlePause() {
    console.log("Pause")
    clearInterval(this.state.timerId)
  }

  handleReset() {
    console.log("Reset")
    clearInterval(this.state.timerId)
    const newItems = _.cloneDeep(this.state.items)
    newItems.forEach(element => {
      element.timeleft = element.duration
      element.active = false
    });
    this.setState({
      runtime: -3,
      items: newItems
    })
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