import React, { Component } from 'react'
import IntervalItem from './IntervalItem'
import Item from './Item'
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
    // console.log("Component did update!")
    // console.log(this.state)

    // const prev = JSON.stringify(prevState)
    // const p = localStorage.getItem('prevStates')    
    // console.log(p)
    // let prevStates
    // if (p && p !== null && p !== undefined) {
    //   prevStates = JSON.parse(p)
    //   prevStates.push(prev)
    // } else {
    //   prevStates = [prev]
    // }

    // localStorage.setItem('prevStates', JSON.stringify(prevStates))
    localStorage.setItem('interval', JSON.stringify(this.state))
  }

  handleAddItem = (item) => {
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

  handleEditItem = (item) => {
    let newItems = _.cloneDeep(this.state.items)
    let newItem = newItems.find(e => e.id === item.id)

    newItem.isEditable = !newItem.isEditable
    console.log(newItem)
    this.setState({ items: newItems })
  }

  handleChangeItem = (item) => {
    let newItems = _.cloneDeep(this.state.items)
    let newItem = newItems.find(e => e.id === item.id)
    newItem.name = item.name
    newItem.timeleft = item.timeleft
    newItem.type = item.type
    newItem.isEditable = item.isEditable
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

  handleUndo() {
    // let prevStates = JSON.parse(localStorage.getItem('prevStates'))
    
    // if (prevStates) {
    //   let prevState = prevStates.pop()
    //   console.log(prevState)
    //   console.log(this.state)
    //   this.setState(prevState)
    //   localStorage.setItem('prevStates', prevStates)
    //   console.log("undo")
    // }
  }

  getTotalDuration() {
    const total = this.state.items
      .map(item => item.duration)
      .reduce((accumulator, current) => accumulator + parseInt(current, 10))
      console.log(total)

      const min = Math.floor(total / 60)
      console.log(min)
      const seconds = total - min*60
      console.log(seconds)

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
        editItem={(event) => { this.handleEditItem(item) }}
        changeItem={(item) => { this.handleChangeItem(item) }}
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
              addBreaks={() => this.handleAddBreaks()}
              undo={() => this.handleUndo()}
              runtime={this.state.runtime}
            />
            Gesamtdauer: {this.getTotalDuration()} Min
          </nav>
        </div>
        <AddIntervalItem addItem={(item) => { this.handleAddItem(item) }} />
      </div >
    );
  }
}