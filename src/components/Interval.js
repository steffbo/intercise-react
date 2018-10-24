import React, { Component } from 'react'
import IntervalItem from './IntervalItem'
import Item from '../model/Item'
import AddIntervalItem from './AddIntervalItem'
import IntervalControls from './IntervalControls'
import uuid from 'uuid'
import { arrayMove } from '../utility'
import _ from 'lodash'
import beep from '../beep.mp3'

export default class Interval extends Component {

  constructor(props) {
    super(props)

    const cache = localStorage.getItem('interval')
    this.state = (cache) ? JSON.parse(cache) : this.getDefault()
    this.saveNextAction = true
  }

  getDefault() {
    return {
      id: 1,
      runtime: -3,
      running: false,
      items: [        
        new Item("Burpees", "Exercise", 40),
        new Item("", "Break", 10)
      ]
    }
  }

  componentDidMount() {
    // console.log(this.state)
  }

  componentDidUpdate(prevProps, prevState) {
    localStorage.setItem('interval', JSON.stringify(this.state))
  }

  handleAddItem = (item) => {

    console.log(item)

    const items = this.state.items.slice();
    const newItem = { ...item }
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

  // makes an item editable by showing input fields
  handleEditItem = (e, item) => {
    let newItems = _.cloneDeep(this.state.items)
    let newItem = newItems.find(e => e.id === item.id)
    newItem.isEditable = !newItem.isEditable
    this.setState({ items: newItems })
    console.log("edit item")
    console.table(newItems)
  }

  // after an item has been edited, save the change
  handleChangeItem = (changedItem) => {

    console.log("change item")
    console.table(changedItem)

    let items = _.cloneDeep(this.state.items)
    let item = items.find(e => e.id === changedItem.id)
    //item = _.clone(changedItem)
    item.name = changedItem.name
    item.duration = changedItem.duration
    item.timeleft = changedItem.timeleft
    item.type = changedItem.type
    item.isEditable = changedItem.isEditable
    this.setState({ items: items })
  }

  handleStart() {
    console.log("Start")
    this.setState({
      running: true,
      timerId: setInterval(this.tick.bind(this), 1000)
    })
  }

  tick() {
    //console.log("Runtime: " + this.state.runtime)

    const runtime = this.state.runtime
    const items = this.state.items
    const newItems = this.updateItems(items, runtime)

    // countdown before start
    if (runtime < 0) {
      new Audio(beep).play()
    }

    const total = this.state.items
      .map(item => item.duration)
      .reduce((accumulator, current) => accumulator + parseInt(current, 10))
    const progress = this.state.runtime / total * 100

    // Update runtime
    this.setState({
      runtime: runtime + 1,
      items: newItems,
      progress: progress
    })
  }

  // update for each timer tick
  updateItems(items, runtime) {
    let durationSum = 0
    const newItems = _.cloneDeep(items)
    let finished = true

    // loop over all items
    for (let i = 0; i < newItems.length; i++) {
      let item = newItems[i]

      // update the active item
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
    this.setState({
      running: false
    })
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
      progress: 0,
      running: false,
      items: newItems
    })
  }

  handleAddBreaks() {
    console.log("add breaks")

    const newItems = _.cloneDeep(this.state.items)

    for (let i = newItems.length; i > 0; i--) {

      console.log(newItems)

      if (newItems[i-1].type === "Exercise") {

        const newBreak = {
          id: uuid(),
          type: "Break",
          name: "",
          duration: 20,
          timeleft: 20,
          active: false
        }
        newItems.splice(i, 0, newBreak)
      }
    }

    this.setState({
      items: newItems
    })
  }

  getTotalDuration() {
    const total = this.state.items
      .map(item => item.duration)
      .reduce((accumulator, current) => accumulator + parseInt(current, 10))

      const min = Math.floor(total / 60)
      let seconds = total - min*60
      if (seconds < 10) {
        seconds = "0" + seconds
      }
      return min + ":" + seconds
  }

  render() {

    const listItems = this.state.items.map(item =>
      <IntervalItem
        key={item.id}
        item={item}
        deleteItem={(event) => { this.handleDeleteItem(event, item) }}
        upItem={(event) => { this.handleUpItem(event, item) }}
        downItem={(event) => { this.handleDownItem(event, item) }}
        editItem={(event) => { this.handleEditItem(event, item) }}
        changeItem={(newItem) => { this.handleChangeItem(newItem) }}
      />
    )

    return (
      <div className="wrapper">
        <h1>Intercise</h1>
       
        <table className="table">
          <thead>
              <tr>
              <th scope="col">Order</th>
              <th scope="col">Exercise</th>
              <th scope="col">Duration</th>
              <th scope="col">Options</th>
              </tr>
          </thead>
          <tbody>            
            {listItems}
          </tbody>
        </table>

        <IntervalControls
          running={this.state.running}
          onStart={() => this.handleStart()}
          onPause={() => this.handlePause()}
          onReset={() => this.handleReset()}
          addBreaks={() => this.handleAddBreaks()}
          undo={() => this.handleUndo()}
          runtime={this.state.runtime}
        />

        <br/>
        Gesamtdauer: {this.getTotalDuration()} Min
        <div className="progress">
          
          <div className="progress-bar" role="progressbar" style={{ width: this.state.progress + '%' }} 
            aria-valuenow={this.state.progress} aria-valuemin="0" aria-valuemax="100"></div>
          </div>

        <AddIntervalItem addItem={(item) => { this.handleAddItem(item) }} />
      </div >
    );
  }
}