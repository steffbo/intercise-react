import React, { Component } from 'react'
import IntervalItem from './IntervalItem'
import Item from '../model/Item'
import AddIntervalItem from './AddIntervalItem'
import IntervalControls from './IntervalControls'
import { arrayMove } from '../utility'
import beep from '../beep.mp3'

export default class Interval extends Component {

  constructor(props) {
    super(props)

    const cache = localStorage.getItem('interval')
    this.state = (cache) ? JSON.parse(cache) : this.getDefault()
  }

  getDefault() {
    return {
      runtime: -3,
      running: false,
      breakLength: 20,
      items: [        
        new Item("Burpees", 40),
        new Item("", 10)
      ]
    }
  }

  componentDidUpdate(prevProps, prevState) {
    localStorage.setItem('interval', JSON.stringify(this.state))
  }

  handleAddItem = (item) => {
    const newItems = [ ...this.state.items, item ]
    this.setState({ items: newItems })
  }

  handleDeleteItem = (item) => {
    const items = this.state.items.slice();
    const filtered = items.filter(e => e !== item)
    this.setState({ items: filtered })
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

  // after an item has been edited, save the change
  handleChangeItem = (changedItem) => {
    const index = this.state.items.findIndex(entry => entry.id === changedItem.id)

    const newItem = { 
      ...this.state.items.find(e => e.id === changedItem.id),
      name: changedItem.name,
      duration: changedItem.duration,
      timeleft: changedItem.timeleft
    }

    const beforeItems = this.state.items.slice(0, index)
    const afterItems = this.state.items.slice(index+1, this.state.items.length+1)
    const newItems = [...beforeItems, newItem, ...afterItems]    
    this.setState({ items: newItems })
  }

  handleStart = () => {
    this.setState({
      running: true,
      timerId: setInterval(this.tick.bind(this), 1000)
    })
  }

  tick() {
    const runtime = this.state.runtime
    const items = this.state.items

    // countdown before start
    if (runtime < 0) {
      new Audio(beep).play()
    }

    const totalDuration = items
      .map(item => item.duration)
      .reduce((accumulator, current) => accumulator + parseInt(current, 10))
    const progress = runtime / totalDuration * 100

    // Update runtime
    this.setState({
      runtime: runtime + 1,
      items: this.updateItems(),
      progress: progress
    })
  }

  // update for each timer tick
  updateItems() {
    let durationSum = 0
    const newItems = [...this.state.items]
    const runtime = this.state.runtime
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
      this.handlePause()
    }
    return newItems
  }

  handlePause = () => {    
    this.setState({
      running: false
    })
    clearInterval(this.state.timerId)
  }

  handleReset = () => {
    clearInterval(this.state.timerId)
    const newItems = [...this.state.items]
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

  setBreakLength = (event) => {
    this.setState({breakLength: parseInt(event.target.value, 10)})
  }

  // adds a break after each exercise
  handleAddBreaks = () => {    
    const newItems = [ ...this.state.items ]
    for (let i = newItems.length-1; i > 0; i--) {
      if (newItems[i-1].name !== "") {
        const newBreak = new Item("", this.state.breakLength)
        newItems.splice(i, 0, newBreak)
      }
    }
    this.setState({ items: newItems })
  }

  handleRemoveBreaks = () => {
    const onlyExercises = this.state.items.filter(item => item.name !== "")    
    this.setState({ items: onlyExercises })
  }

  getTotalDurationString() {
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
        deleteItem={() => { this.handleDeleteItem(item) }}
        upItem={(event) => { this.handleUpItem(event, item) }}
        downItem={(event) => { this.handleDownItem(event, item) }}
        changeItem={(newItem) => { this.handleChangeItem(newItem) }}
        running={this.state.running}
      />
    )

    return (
      <div className="wrapper">
        {!this.state.running && <h1>Intercise</h1>}
       
        {this.state.running && 
        <div>Total duration: {this.getTotalDurationString()} Min
          <div className="progress">          
            <div className="progress-bar" role="progressbar" style={{ width: this.state.progress + '%' }} 
              aria-valuenow={this.state.progress} aria-valuemin="0" aria-valuemax="100">
            </div>
          </div>
        </div>}

        <table className="table">
          <thead>
              <tr>
              {!this.state.running && <th className="col-order" scope="col">Order</th>}
              <th className="col-exercise" scope="col">Exercise</th>
              <th className="col-duration" scope="col">Duration</th>
              {!this.state.running && <th className="col-options" scope="col">Options</th>}
              </tr>
          </thead>
          <tbody>            
            {listItems}
          </tbody>
        </table>

        <IntervalControls
          running={this.state.running}
          onStart={this.handleStart}
          onPause={this.handlePause}
          onReset={this.handleReset}
          addBreaks={this.handleAddBreaks}
          removeBreaks={this.handleRemoveBreaks}          
          runtime={this.state.runtime}
          breakLength={this.state.breakLength}
          setBreakLength={this.setBreakLength}
        />

        {/*<div className="slidecontainer">
          <input type="range" min="1" max="100" defaultValue="50" className="slider" id="myRange"/>
        </div>*/}

        Runtime: {this.state.runtime}

        <AddIntervalItem 
          running={this.state.running} 
          addItem={(item) => { this.handleAddItem(item) }} 
        />
      </div >
    );
  }
}